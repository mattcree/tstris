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

    this.start();
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
    const timeRemovalFactor = this.game.level / 4;

    const timeToRemove = parseFloat(`1.${timeRemovalFactor}`) * 100;

    return ONE_SECOND_MS - timeToRemove;
  }

  nextLevel() {
    this.stop();
    this.start();
  }
}
