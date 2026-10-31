import * as THREE from "three";

// Small, deterministic textures generated once. The room needs no external assets.
export function canvasTexture(width, height, draw, repeat = [1, 1]) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  draw(canvas.getContext("2d"), width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(...repeat);
  texture.anisotropy = 4;
  return texture;
}

function noise(seed) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

export function walnutTexture() {
  return canvasTexture(512, 256, (c, w, h) => {
    const random = noise(37);
    c.fillStyle = "#8f6245";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 650; i++) {
      const y = random() * h,
        wave = 2 + random() * 8;
      c.strokeStyle = i % 3 ? "rgba(35,15,7,.12)" : "rgba(236,190,131,.14)";
      c.lineWidth = 0.3 + random() * 1.5;
      c.beginPath();
      c.moveTo(0, y);
      c.bezierCurveTo(w * 0.3, y - wave, w * 0.65, y + wave, w, y + 1);
      c.stroke();
    }
  });
}

export function clothTexture() {
  return canvasTexture(
    128,
    128,
    (c, w, h) => {
      const random = noise(19);
      c.fillStyle = "#e3e9e2";
      c.fillRect(0, 0, w, h);
      for (let y = 0; y < h; y += 2) {
        c.fillStyle = "rgba(255,255,255,.16)";
        c.fillRect(0, y, w, 1);
      }
      for (let i = 0; i < 6500; i++) {
        c.fillStyle = i % 2 ? "rgba(0,0,0,.045)" : "rgba(255,255,255,.09)";
        c.fillRect(random() * w, random() * h, 1, 1);
      }
    },
    [18, 9],
  );
}

export function floorTexture() {
  return canvasTexture(
    1024,
    1024,
    (c, w, h) => {
      const random = noise(63),
        plank = 64;
      c.fillStyle = "#1b1714";
      c.fillRect(0, 0, w, h);
      for (let row = 0; row < 16; row++) {
        for (let col = -1; col < 4; col++) {
          const x = col * 320 + (row % 3) * 106,
            y = row * plank;
          const light = 19 + random() * 8;
          c.fillStyle = `hsl(28, 25%, ${light}%)`;
          c.fillRect(x + 1, y + 1, 318, plank - 2);
          for (let j = 0; j < 32; j++) {
            c.strokeStyle = j % 3 ? "rgba(7,5,3,.13)" : "rgba(209,162,109,.09)";
            const gy = y + random() * plank;
            c.beginPath();
            c.moveTo(x, gy);
            c.bezierCurveTo(x + 95, gy - 2, x + 240, gy + 2, x + 320, gy);
            c.stroke();
          }
        }
      }
    },
    [4, 4],
  );
}

export function rugTexture() {
  return canvasTexture(1024, 640, (c, w, h) => {
    const random = noise(87);
    c.fillStyle = "#1b302e";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 30000; i++) {
      c.fillStyle = i % 2 ? "#ffffff08" : "#0000000e";
      c.fillRect(random() * w, random() * h, 1, 2);
    }
    for (const [inset, color, thickness] of [
      [19, "#7c6747", 3],
      [28, "#64715b", 1],
      [45, "#82704e", 2],
      [51, "#82704e", 1],
    ]) {
      c.strokeStyle = color;
      c.lineWidth = thickness;
      c.strokeRect(inset, inset, w - inset * 2, h - inset * 2);
    }
    // Repeating small diamonds around the woven border.
    c.fillStyle = "#9c8254";
    const diamond = (x, y) => {
      c.beginPath();
      c.moveTo(x, y - 4);
      c.lineTo(x + 3, y);
      c.lineTo(x, y + 4);
      c.lineTo(x - 3, y);
      c.closePath();
      c.fill();
    };
    for (let x = 66; x < w - 55; x += 22) {
      diamond(x, 37);
      diamond(x, h - 37);
    }
    for (let y = 65; y < h - 55; y += 22) {
      diamond(37, y);
      diamond(w - 37, y);
    }
  });
}

export function softShadowTexture() {
  return canvasTexture(128, 128, (c, w, h) => {
    const gradient = c.createRadialGradient(
      w / 2,
      h / 2,
      10,
      w / 2,
      h / 2,
      w / 2,
    );
    gradient.addColorStop(0, "rgba(0,0,0,.65)");
    gradient.addColorStop(0.5, "rgba(0,0,0,.38)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    c.fillStyle = gradient;
    c.fillRect(0, 0, w, h);
  });
}

export function disposeGroup(group) {
  const geometries = new Set(),
    materials = new Set(),
    textures = new Set();
  group.traverse((o) => {
    if (o.geometry) geometries.add(o.geometry);
    for (const m of o.material
      ? Array.isArray(o.material)
        ? o.material
        : [o.material]
      : []) {
      materials.add(m);
      for (const value of Object.values(m))
        if (value?.isTexture) textures.add(value);
    }
  });
  geometries.forEach((g) => g.dispose());
  materials.forEach((m) => m.dispose());
  textures.forEach((t) => t.dispose());
  group.removeFromParent();
}
