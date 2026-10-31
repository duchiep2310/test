import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { performance } from "node:perf_hooks";
import { WebSocketServer, WebSocket } from "ws";
import { RoomHub } from "./RoomHub.js";

const root = resolve(fileURLToPath(new URL("../dist", import.meta.url)));
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".png": "image/png",
};
/** Exported factory permits isolated socket/HTTP integration tests on ephemeral ports. */
export function createRoomServer(options = {}) {
  const hub = new RoomHub(options);
  const origins = new Set(
    (options.allowedOrigins ?? process.env.ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
  );
  const server = http.createServer(async (req, res) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405).end();
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
    } catch {
      res.writeHead(400).end();
      return;
    }
    if (pathname === "/health") {
      res.setHeader("Cache-Control", "no-store");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: "ok", protocol: 1, rooms: hub.rooms.size }),
      );
      return;
    }
    try {
      const file = resolve(
        root,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (
        !file.startsWith(root + sep) ||
        pathname.split("/").some((p) => p.startsWith("."))
      ) {
        res.writeHead(403).end();
        return;
      }
      if (!(await stat(file)).isFile()) {
        res.writeHead(404).end("Not found");
        return;
      }
      res.writeHead(200, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
        "Cache-Control": pathname.startsWith("/assets/")
          ? "public, max-age=31536000, immutable"
          : "no-cache",
      });
      res.end(req.method === "HEAD" ? undefined : await readFile(file));
    } catch {
      res.writeHead(404).end("Not found");
    }
  });
  const wss = new WebSocketServer({
    noServer: true,
    maxPayload: 4096,
    perMessageDeflate: false,
  });
  server.on("upgrade", (req, socket, head) => {
    let originOK = !req.headers.origin;
    try {
      originOK ||=
        new URL(req.headers.origin).host === req.headers.host ||
        origins.has(req.headers.origin);
    } catch {}
    let pathname;
    try {
      pathname = new URL(req.url, "http://localhost").pathname;
    } catch {
      socket.end("HTTP/1.1 400 Bad Request\r\nConnection: close\r\n\r\n");
      return;
    }
    if (pathname !== "/ws" || !originOK) {
      socket.end("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
      return;
    }
    wss.handleUpgrade(req, socket, head, (ws) =>
      wss.emit("connection", ws, req),
    );
  });
  wss.on("connection", (socket) => {
    const peer = {
      socket,
      room: null,
      seat: null,
      closed: false,
      alive: true,
      send(data) {
        this.sendEncoded(JSON.stringify(data));
      },
      sendEncoded(encoded) {
        if (socket.readyState !== WebSocket.OPEN) return;
        // Do not queue unbounded snapshots for slow spectator connections.
        if (socket.bufferedAmount > 1024 * 1024) {
          socket.close(4002, "Connection too slow");
          return;
        }
        socket.send(encoded);
      },
    };
    const joinDeadline = setTimeout(() => {
      if (!peer.room) socket.close(1008, "Join timeout");
    }, 30000);
    joinDeadline.unref();
    socket.on("pong", () => {
      peer.alive = true;
    });
    let tokens = 100,
      last = performance.now();
    socket.on("message", (bytes, binary) => {
      const now = performance.now();
      tokens = Math.min(100, tokens + (now - last) * 0.06);
      last = now;
      if (--tokens < 0) {
        socket.close(1008, "Rate limit");
        return;
      }
      let data;
      try {
        if (binary) throw new Error("Chỉ hỗ trợ thông điệp JSON.");
        data = JSON.parse(bytes.toString());
        hub.handle(peer, data);
      } catch (error) {
        peer.send({
          type: data?.type === "chat" ? "chatError" : "error",
          ...(data?.type === "chat" && typeof data.requestId === "string"
            ? { requestId: data.requestId.slice(0, 40) }
            : {}),
          message:
            error instanceof SyntaxError
              ? "Thông điệp JSON không hợp lệ."
              : error.message,
        });
      }
    });
    socket.on("error", () => {});
    socket.on("close", () => {
      clearTimeout(joinDeadline);
      peer.closed = true;
      if (peer.room) peer.room.remove(peer);
    });
    socket.peer = peer;
    peer.send({ type: "hello", protocol: 1 });
  });
  let last = performance.now(),
    accumulator = 0;
  const ticker = setInterval(() => {
    const now = performance.now();
    accumulator += Math.min((now - last) / 1000, 0.1);
    last = now;
    while (accumulator >= 1 / 240) {
      hub.tick(1 / 240);
      accumulator -= 1 / 240;
    }
  }, 1000 / 120);
  ticker.unref();
  const snapshots = setInterval(() => hub.broadcast(), 50);
  snapshots.unref();
  const cleanup = setInterval(() => {
    hub.cleanup();
    for (const socket of wss.clients) {
      if (!socket.peer.alive) {
        socket.terminate();
        continue;
      }
      socket.peer.alive = false;
      socket.ping();
    }
  }, 15000);
  cleanup.unref();
  return {
    server,
    hub,
    wss,
    async close() {
      clearInterval(ticker);
      clearInterval(snapshots);
      clearInterval(cleanup);
      for (const socket of wss.clients) socket.terminate();
      await new Promise((resolve) => wss.close(resolve));
      if (server.listening)
        await new Promise((resolve) => server.close(resolve));
    },
  };
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const app = createRoomServer({
    maxRooms: Number(process.env.MAX_ROOMS) || 100,
    maxSpectators: Number(process.env.MAX_SPECTATORS) || 200,
  });
  const port = Number(process.env.PORT) || 3001;
  app.server.listen(port, "0.0.0.0", () =>
    console.log(`Velvet rooms listening on port ${port}`),
  );
  const stop = () => {
    app.close().then(() => process.exit(0));
  };
  process.on("SIGTERM", stop);
  process.on("SIGINT", stop);
}
