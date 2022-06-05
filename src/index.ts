import { Game } from "./types";
import { TetrisGame } from "./TetrisGame";

const render = (game: Game): void => {
  const gridContainer = document.getElementById("grid");

  if (gridContainer && game) {
    gridContainer.innerHTML = game.toString();
  }

  const scoreContainer = document.getElementById("score");

  if (scoreContainer && game) {
    scoreContainer.innerHTML = game.score.toString();
  }
};

let tetris = new TetrisGame(render);

// setInterval(() => tetris.tick(), 1000);

window.tetris = tetris;

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
