import BaseGameMode, { makeBall } from "./BaseGameMode.js";
import { TABLE } from "../core/Constants.js";

export default class NineBallMode extends BaseGameMode {
  constructor(options = {}) {
    super({ ...options, id: "nine", name: "9-Ball Pool" });
  }
  setup() {
    const balls = [makeBall(0, -1.4, 0)];
    const spacing = TABLE.radius * 2 + 0.002;
    const ids = [1, 2, 3, 4, 9, 5, 6, 7, 8];
    let i = 0;
    [1, 2, 3, 2, 1].forEach((count, row) => {
      for (let col = 0; col < count; col++)
        balls.push(
          makeBall(
            ids[i++],
            1.05 + (row * spacing * Math.sqrt(3)) / 2,
            (col - (count - 1) / 2) * spacing,
          ),
        );
    });
    return balls;
  }
  legalTargets(balls) {
    const ids = balls.filter((b) => b.active && b.id > 0).map((b) => b.id);
    return ids.length ? [Math.min(...ids)] : [];
  }
  evaluateShot(shot) {
    const f = this.shotFacts(shot);
    const foul = this.poolFoul(f, this.legalTargets(f.before));
    this.isBreak = false;
    if (foul)
      return this.foul(foul, { respot: f.potted.includes(9) ? [9] : [] });
    if (f.potted.includes(9)) {
      this.winner = this.currentPlayer;
      this.scores[this.currentPlayer]++;
      return this.result("A legal nine. Match won!");
    }
    const made = f.potted.filter((id) => id > 0).length;
    this.scores[this.currentPlayer] += made;
    if (!made) this.switchTurn();
    return this.result(
      made
        ? "Legal pocket. Keep your turn."
        : `Player ${this.currentPlayer + 1} to shoot.`,
    );
  }
  display(balls) {
    return {
      objective: `Contact the ${this.legalTargets(balls)[0] ?? "nine"} first. A legal nine wins, including combinations.`,
      players: [0, 1].map((i) => ({
        label: `Player ${i + 1}`,
        detail: `${this.scores[i]} pocketed`,
        remaining: balls
          .filter((b) => b.active && b.id > 0)
          .map((b) => b.id)
          .sort((a, b) => a - b),
      })),
    };
  }
}
