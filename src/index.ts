import { Game } from "./types";
import TetrisGame from "./game/TetrisGame";
import TetrisGameSession from "./game/TetrisGameSession";
import {inBox, horizontal, vertical} from "./utils"

const render = (game: Game): void => {
  const gameContainer = document.getElementById("game");
  if (gameContainer && game) {
    const gameInfo = [
      "Score:  ",
      game.score.toString(),
      "Level:  ",
      game.level.toString(),
      "Lines:  ",
      game.linesCleared.toString(),
    ].join("\n")
    gameContainer.innerHTML = horizontal(
      game.toString(), 
      vertical(
        inBox(gameInfo), 
        inBox(game.nextTetromino.toString())
      )
    )
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
