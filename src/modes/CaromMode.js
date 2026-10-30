import BaseGameMode, { makeBall } from "./BaseGameMode.js";

export default class CaromMode extends BaseGameMode {
  constructor(options = {}) {
    super({ ...options, id: "carom", name: "Carom Billiards", pockets: false });
    this.isBreak = false;
  }
  setup() {
    return [
      makeBall(0, -1.4, 0.38),
      makeBall(1, -1.4, -0.38),
      makeBall(2, 1.4, 0),
    ];
  }
  cueId() {
    return this.currentPlayer;
  }
  evaluateShot(shot) {
    const cue = this.cueId();
    const touched = new Set();
    let cushions = 0;
    let scoringCushions = 0;
    for (const e of shot.events) {
      if (e.type === "cushion" && e.ball === cue) cushions++;
      if (e.type === "collision" && (e.a === cue || e.b === cue)) {
        touched.add(e.a === cue ? e.b : e.a);
        if (touched.size === 2) {
          scoringCushions = cushions;
          break;
        }
      }
    }
    const scored =
      touched.size === 2 && (this.id !== "three" || scoringCushions >= 3);
    this.lastCushionCount = touched.size === 2 ? scoringCushions : cushions;
    if (scored) {
      this.scores[this.currentPlayer]++;
      if (this.scores[this.currentPlayer] >= this.targetScore)
        this.winner = this.currentPlayer;
      return this.result(
        this.winner !== null
          ? "Target reached. Match won!"
          : "Carom! One point. Keep your turn.",
      );
    }
    this.switchTurn();
    return this.result(
      this.id === "three"
        ? `No point — three cushions must precede the second object ball. Player ${this.currentPlayer + 1} to shoot.`
        : `No carom. Player ${this.currentPlayer + 1} to shoot.`,
    );
  }
  display() {
    return {
      objective:
        this.id === "three"
          ? `Three cushions before the second object ball. First to ${this.targetScore}.`
          : `Hit both object balls with your cue ball. First to ${this.targetScore}.`,
      players: [0, 1].map((i) => ({
        label: `Player ${i + 1}`,
        detail: `${i === 0 ? "White" : "Yellow"} · ${this.scores[i]} / ${this.targetScore}`,
        remaining: [],
      })),
    };
  }
}
