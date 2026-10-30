export function cleanName(value, fallback = "Người chơi") {
  return (
    (typeof value === "string" ? value : "")
      .replace(/[\u0000-\u001f\u007f<>\u202a-\u202e\u2066-\u2069]/g, "")
      .trim()
      .slice(0, 24) || fallback
  );
}
