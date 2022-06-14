import { Game } from "./types";
import TetrisGame from "./game/TetrisGame";
import TetrisGameSession from "./game/TetrisGameSession";
import {inBox} from "./utils"

const render = (game: Game): void => {
  const gridContainer = document.getElementById("grid");
  if (gridContainer && game) {
    gridContainer.innerHTML = game.toString();
  }

  const gameInfoContainer = document.getElementById("game-info");
  if (gameInfoContainer && game) {
    const gameInfo = [
      "Score:",
      game.score.toString(),
      "Level:",
      game.level.toString(),
      "Lines:",
      game.linesCleared.toString(),
    ].join("\n")
    gameInfoContainer.innerHTML = inBox(gameInfo);
  }

  // const scoreContainer = document.getElementById("score");
  // if (scoreContainer && game) {
  //   scoreContainer.innerHTML = `Score: ${game.score.toString()}`;
  // }

  // const levelContainer = document.getElementById("level");
  // if (levelContainer && game) {
  //   levelContainer.innerHTML = `Level: ${game.level.toString()}`;
  // }

  // const linesClearedContainer = document.getElementById("cleared");
  // if (linesClearedContainer && game) {
  //   linesClearedContainer.innerHTML = `Lines: ${game.linesCleared.toString()}`;
  // }

  const nextContainer = document.getElementById("next");
  if (nextContainer && game) {
    nextContainer.innerHTML = `${inBox(game.nextTetromino.toString())}`;
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
