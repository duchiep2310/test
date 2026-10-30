export const GameState = Object.freeze(
  Object.fromEntries(
    [
      "MENU",
      "MODE_SELECTION",
      "GAME_SETUP",
      "BREAK_SHOT",
      "PLAYER_TURN",
      "SHOT_IN_PROGRESS",
      "BALLS_SETTLING",
      "FOUL",
      "BALL_IN_HAND",
      "GAME_OVER",
      "PAUSED",
    ].map((v) => [v, v]),
  ),
);
