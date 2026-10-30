import NineBallMode from "./NineBallMode.js";
import { triangle } from "./BaseGameMode.js";

export default class TenBallMode extends NineBallMode {
  constructor(options = {}) {
    super(options);
    this.id = "ten";
    this.name = "10-Ball Pool";
  }
  setup() {
    return triangle([1, 2, 3, 4, 10, 5, 6, 7, 8, 9], 4);
  }
  evaluateShot(shot) {
    const f = this.shotFacts(shot);
    const targets = this.legalTargets(f.before);
    const foul = this.poolFoul(f, targets);
    const wasBreak = this.isBreak;
    this.isBreak = false;
    const ten = f.pockets.find((e) => e.ball === 10);
    if (foul) return this.foul(foul, { respot: ten ? [10] : [] });
    const called = f.pockets.find(
      (e) =>
        e.ball === Number(shot.calledBall) && e.pocket === shot.calledPocket,
    );
    // Ten is a last-ball finish. A ten made early, on the break, or uncalled is
    // spotted; other legally contacted but uncalled pockets simply end the turn.
    if (ten && !wasBreak && targets[0] === 10 && called?.ball === 10) {
      this.winner = this.currentPlayer;
      this.scores[this.currentPlayer]++;
      return this.result("Ten in the called pocket. Match won!");
    }
    const keepTurn = wasBreak
      ? f.potted.some((id) => id > 0 && id !== 10)
      : Boolean(called && called.ball !== 10);
    this.scores[this.currentPlayer] += f.potted.filter(
      (id) => id > 0 && id !== 10,
    ).length;
    if (!keepTurn) this.switchTurn();
    return this.result(
      ten
        ? "Ten spotted. It must be called and pocketed last."
        : keepTurn
          ? "Called ball made. Keep your turn."
          : wasBreak
            ? `Legal break. Player ${this.currentPlayer + 1} to shoot.`
            : `No called pocket. Player ${this.currentPlayer + 1} to shoot.`,
      { respot: ten ? [10] : [] },
    );
  }
  display(balls) {
    const info = super.display(balls);
    info.objective = this.isBreak
      ? "Break the rack. The ten is spotted on the break."
      : `Contact the ${this.legalTargets(balls)[0] ?? 10} first. Call a ball and pocket; finish with the ten last.`;
    return info;
  }
}
