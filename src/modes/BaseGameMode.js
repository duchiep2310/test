import { TABLE } from "../core/Constants.js";

export function makeBall(id, x, z) {
  return {
    id,
    x,
    z,
    vx: 0,
    vz: 0,
    radius: TABLE.radius,
    mass: 1,
    active: true,
    spin: { x: 0, y: 0 },
    angularVelocity: 0,
  };
}

export function triangle(ids, rows) {
  const balls = [makeBall(0, -1.4, 0)];
  const spacing = TABLE.radius * 2 + 0.002;
  let i = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col <= row; col++) {
      balls.push(
        makeBall(
          ids[i++],
          1.05 + (row * spacing * Math.sqrt(3)) / 2,
          (col - row / 2) * spacing,
        ),
      );
    }
  }
  return balls;
}

export default class BaseGameMode {
  constructor({ id, name, pockets = true, targetScore = 5 }) {
    this.id = id;
    this.name = name;
    this.pockets = pockets;
    this.targetScore = Math.max(1, Math.min(50, Number(targetScore) || 5));
    this.currentPlayer = 0;
    this.scores = [0, 0];
    this.groups = [null, null];
    this.winner = null;
    this.isBreak = true;
  }

  cueId() {
    return 0;
  }
  switchTurn() {
    this.currentPlayer = 1 - this.currentPlayer;
  }
  legalTargets(balls) {
    return balls
      .filter((b) => b.active && b.id !== this.cueId())
      .map((b) => b.id);
  }
  result(message, extra = {}) {
    return {
      foul: false,
      ballInHand: false,
      message,
      winner: this.winner,
      respot: [],
      ...extra,
    };
  }

  // Evaluation receives post-shot balls. Reconstruct pre-shot availability from
  // pocket events so a player cannot clear the last ball and eight in one shot.
  shotFacts({ events = [], balls = [], initialBalls = null }) {
    const cue = this.cueId();
    const pockets = events.filter((e) => e.type === "pocket");
    const potted = pockets.map((e) => e.ball);
    const before =
      initialBalls || balls.filter((b) => b.active || potted.includes(b.id));
    const firstIndex = events.findIndex(
      (e) => e.type === "collision" && (e.a === cue || e.b === cue),
    );
    const first =
      firstIndex < 0
        ? null
        : events[firstIndex].a === cue
          ? events[firstIndex].b
          : events[firstIndex].a;
    const afterContact = firstIndex < 0 ? [] : events.slice(firstIndex + 1);
    const railOrPocket = afterContact.some(
      (e) => e.type === "cushion" || e.type === "pocket",
    );
    const breakRails = new Set(
      afterContact
        .filter((e) => e.type === "cushion" && e.ball !== cue)
        .map((e) => e.ball),
    ).size;
    return {
      cue,
      pockets,
      potted,
      before,
      first,
      railOrPocket,
      breakRails,
      events,
    };
  }

  poolFoul(facts, targets) {
    if (facts.potted.includes(facts.cue)) return "Scratch — cue ball pocketed.";
    if (facts.first === null) return "No object ball contacted.";
    if (!targets.includes(facts.first)) return "Wrong first contact.";
    const objectPocket = facts.potted.some((id) => id !== facts.cue);
    if (this.isBreak && !objectPocket && facts.breakRails < 4)
      return "Illegal break — pocket a ball or send four object balls to cushions.";
    if (!this.isBreak && !facts.railOrPocket)
      return "No cushion or pocket after contact.";
    return null;
  }

  foul(message, extra = {}) {
    this.isBreak = false;
    this.switchTurn();
    return this.result(
      `${message} Ball in hand for Player ${this.currentPlayer + 1}.`,
      { foul: true, ballInHand: true, ...extra },
    );
  }

  display(balls) {
    return {
      objective: "Choose your line. Commit to the shot.",
      players: [0, 1].map((i) => ({
        label: `Player ${i + 1}`,
        detail: `${this.scores[i]} points`,
        remaining: [],
      })),
    };
  }
}
