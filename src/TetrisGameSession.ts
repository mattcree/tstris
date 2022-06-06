import { Game } from "./types";

interface TetrisGameSessionParams {
  game: Game;
}

const ONE_SECOND_MS = 1000;

export default class TetrisGameSession {
  timeoutId?: number;
  game: Game;

  constructor({ game }: TetrisGameSessionParams) {
    this.game = game
      .addLevelChangeListener(() => this.nextLevel())
      .addGameOverListener(() => this.gameOver());
  }

  start() {
    this.timeoutId = setInterval(() => this.game.tick(), this.tickInterval());
  }

  stop() {
    clearInterval(this.timeoutId);
  }

  gameOver() {
    this.stop();
  }

  tickInterval() {
    return (this.game.level + 1) * ONE_SECOND_MS;
  }

  nextLevel() {
    this.stop();
    this.start();
  }
}
