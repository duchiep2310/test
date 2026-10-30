import BaseGameMode, { triangle } from "./BaseGameMode.js";
const groupFor = (id) =>
  id >= 1 && id <= 7 ? "solids" : id >= 9 && id <= 15 ? "stripes" : null;

export default class EightBallMode extends BaseGameMode {
  constructor(options = {}) {
    super({ ...options, id: "eight", name: "8-Ball Pool" });
  }
  setup() {
    return triangle([1, 9, 2, 10, 8, 3, 11, 4, 12, 5, 6, 13, 7, 14, 15], 5);
  }
  legalTargets(balls) {
    const own = this.groups[this.currentPlayer];
    if (!own)
      return balls.filter((b) => b.active && groupFor(b.id)).map((b) => b.id);
    const remaining = balls
      .filter((b) => b.active && groupFor(b.id) === own)
      .map((b) => b.id);
    return remaining.length ? remaining : [8];
  }
  updateScores(balls) {
    this.scores = this.groups.map((group) =>
      group
        ? 7 - balls.filter((b) => b.active && groupFor(b.id) === group).length
        : 0,
    );
  }
  evaluateShot(shot) {
    const f = this.shotFacts(shot);
    const targets = this.legalTargets(f.before);
    const foul = this.poolFoul(f, targets);
    const wasBreak = this.isBreak;
    this.isBreak = false;
    const eight = f.pockets.find((e) => e.ball === 8);
    // Eight on the break is spotted; this avoids an arbitrary rerack choice.
    if (eight && !wasBreak) {
      const legal =
        !foul && targets.includes(8) && shot.calledPocket === eight.pocket;
      this.winner = legal ? this.currentPlayer : 1 - this.currentPlayer;
      this.updateScores(shot.balls);
      return this.result(
        legal
          ? "Eight in the called pocket. Match won!"
          : "Illegal eight — pocket it only after clearing your group, in the called pocket.",
        { foul: !legal },
      );
    }
    if (foul) {
      this.updateScores(shot.balls);
      return this.foul(foul, { respot: eight ? [8] : [] });
    }
    // Standard open-table break: groups are established by a subsequent legal pot.
    if (!wasBreak && !this.groups[this.currentPlayer]) {
      const assigned = f.potted.map(groupFor).find(Boolean);
      if (assigned) {
        this.groups[this.currentPlayer] = assigned;
        this.groups[1 - this.currentPlayer] =
          assigned === "solids" ? "stripes" : "solids";
      }
    }
    const ownPocket = f.potted.some((id) =>
      wasBreak
        ? groupFor(id) || id === 8
        : groupFor(id) === this.groups[this.currentPlayer],
    );
    this.updateScores(shot.balls);
    if (!ownPocket) this.switchTurn();
    return this.result(
      eight
        ? "Eight on the break is spotted. Continue."
        : ownPocket
          ? `Legal pocket. Player ${this.currentPlayer + 1} continues.`
          : `Player ${this.currentPlayer + 1} to shoot.`,
      { respot: eight ? [8] : [] },
    );
  }
  display(balls) {
    const targets = this.legalTargets(balls);
    return {
      objective:
        targets[0] === 8 && targets.length === 1
          ? "Call a pocket for the eight, then make your finish."
          : this.groups[this.currentPlayer]
            ? `Pocket your ${this.groups[this.currentPlayer]}. Save the eight for last.`
            : this.isBreak
              ? "Break the rack. Pocket a ball or reach four cushions."
              : "Open table. A legal pocket assigns solids and stripes.",
      players: [0, 1].map((i) => ({
        label: `Player ${i + 1}`,
        detail: this.groups[i] || "Open table",
        remaining: balls
          .filter(
            (b) =>
              b.active &&
              (this.groups[i]
                ? groupFor(b.id) === this.groups[i]
                : groupFor(b.id)),
          )
          .map((b) => b.id),
      })),
    };
  }
}
