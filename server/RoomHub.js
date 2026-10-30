import { randomInt } from "node:crypto";
import { Room } from "./Room.js";
import { MODES, ROOM_PATTERN } from "./validation.js";

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export class RoomHub {
  constructor(options = {}) {
    this.rooms = new Map();
    this.options = options;
    this.maxRooms = options.maxRooms ?? 100;
    this.emptyTtlMs = options.emptyTtlMs ?? 300000;
  }
  handle(peer, data) {
    if (!data || typeof data !== "object" || Array.isArray(data))
      throw new Error("Thông điệp không hợp lệ.");
    if (data.type === "create" || data.type === "join") {
      if (peer.room) throw new Error("Hãy rời phòng hiện tại trước.");
      if (data.type === "create") {
        if (this.rooms.size >= this.maxRooms)
          throw new Error("Máy chủ đang đủ phòng. Vui lòng thử lại sau.");
        if (!MODES.has(data.mode)) throw new Error("Chế độ chơi không hợp lệ.");
        const target = data.targetScore ?? 5;
        if (!Number.isInteger(target) || target < 1 || target > 50)
          throw new Error("Điểm đích phải từ 1 đến 50.");
        let id;
        do {
          id = Array.from(
            { length: 6 },
            () => alphabet[randomInt(alphabet.length)],
          ).join("");
        } while (this.rooms.has(id));
        if (data.resumeToken)
          throw new Error("Tạo phòng mới không nhận token ghế cũ.");
        const room = new Room(id, data.mode, target, this.options);
        room.join(peer, { name: data.name });
        this.rooms.set(id, room);
      } else {
        const id =
          typeof data.roomId === "string"
            ? data.roomId.trim().toUpperCase()
            : "";
        if (!ROOM_PATTERN.test(id))
          throw new Error("Mã phòng gồm 6 chữ hoặc số.");
        const room = this.rooms.get(id);
        if (!room)
          throw new Error(
            "Không tìm thấy phòng. Kiểm tra lại mã hoặc tạo phòng mới.",
          );
        room.expire();
        room.join(peer, data);
      }
    } else if (data.type === "leave") {
      if (peer.room) peer.room.remove(peer, true);
      peer.send({ type: "left" });
    } else {
      if (!peer.room) throw new Error("Bạn chưa vào phòng.");
      peer.room.command(peer, data);
    }
  }
  tick(dt) {
    for (const room of this.rooms.values()) room.tick(dt);
  }
  broadcast() {
    for (const room of this.rooms.values())
      if (
        room.people.length &&
        (room.dirty ||
          room.match.physics.isMoving() ||
          Date.now() - (room.lastBroadcast || 0) >= 1000)
      )
        room.broadcast();
  }
  cleanup(now = Date.now()) {
    for (const [id, room] of this.rooms) {
      room.expire(now);
      if (room.emptySince != null && now - room.emptySince >= this.emptyTtlMs)
        this.rooms.delete(id);
    }
  }
}
