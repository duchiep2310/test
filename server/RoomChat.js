/** Room-local messages travel separately from the physics snapshots. */
export class RoomChat {
  constructor(room, cooldownMs = 800) {
    this.room = room;
    this.cooldownMs = cooldownMs;
    this.messages = [];
    this.sequence = 0;
    this.lastSent = new WeakMap();
  }
  post(peer, data) {
    if (peer.closed || !this.room.people.includes(peer))
      throw new Error("Bạn chưa vào phòng.");
    if (typeof data.text !== "string")
      throw new Error("Tin nhắn không hợp lệ.");
    const text = data.text
      .normalize("NFC")
      .replace(/\r\n?/g, "\n")
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
      .trim();
    if (!text || text.length > 300)
      throw new Error("Tin nhắn cần có nội dung và tối đa 300 ký tự.");
    if (
      data.requestId != null &&
      (typeof data.requestId !== "string" || data.requestId.length > 40)
    )
      throw new Error("Mã tin nhắn không hợp lệ.");
    const now = Date.now();
    if (now - (this.lastSent.get(peer) ?? -Infinity) < this.cooldownMs)
      throw new Error("Bạn gửi hơi nhanh. Đợi một chút rồi gửi lại nhé.");
    const seat = this.room.seatOf(peer);
    const message = {
      id: ++this.sequence,
      authorId: peer.chatId,
      seat: seat < 0 ? null : seat,
      name: seat < 0 ? peer.name : this.room.players[seat].name,
      at: now,
      text,
      requestId: data.requestId ?? null,
    };
    this.lastSent.set(peer, now);
    this.messages.push(message);
    if (this.messages.length > 50) this.messages.shift();
    this.room.lastActive = now;
    const encoded = JSON.stringify({
      type: "chat",
      roomId: this.room.id,
      message,
    });
    for (const member of this.room.people) member.sendEncoded(encoded);
    return message;
  }
}
