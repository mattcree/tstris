import { Game } from "./types";
import TetrisGame from "./TetrisGame";
import TetrisGameSession from "./TetrisGameSession";

const render = (game: Game): void => {
  const gridContainer = document.getElementById("grid");
  if (gridContainer && game) {
    gridContainer.innerHTML = game.toString();
  }

  const scoreContainer = document.getElementById("score");
  if (scoreContainer && game) {
    scoreContainer.innerHTML = `Score: ${game.score.toString()}`;
  }

  const levelContainer = document.getElementById("level");
  if (levelContainer && game) {
    levelContainer.innerHTML = `Level: ${game.level.toString()}`;
  }

  const linesClearedContainer = document.getElementById("cleared");
  if (linesClearedContainer && game) {
    linesClearedContainer.innerHTML = `Lines: ${game.linesCleared.toString()}`;
  }

  const nextContainer = document.getElementById("next");
  if (nextContainer && game) {
    nextContainer.innerHTML = `${game.nextTetromino.toString()}`;
  }

  const gameOverContainer = document.getElementById("game-over");
  if (gameOverContainer && game.gameOver) {
    gameOverContainer.innerHTML = "Game Over";
  }
};

let tetris = new TetrisGame({
  gridWidth: 10,
  gridHeight: 20
}).addGridChangeListener(render);

let tetrisGameSession = new TetrisGameSession({
  game: tetris
});

window.tetris = tetris;
window.tgs = tetrisGameSession;

document.addEventListener("keypress", (event) => {
  switch (event.key) {
    case "s":
      tetris.moveDown();
      break;
    case "d":
      tetris.moveRight();
      break;
    case "a":
      tetris.moveLeft();
      break;
    case "q":
      tetris.rotateLeft();
      break;
    case "e":
      tetris.rotateRight();
      break;
  }
});
