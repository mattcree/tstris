import { Game } from "./types";
import { LShape } from "./tetrominos/LShape";
import { CellType } from "./types";
import TetrominoBlock from "./TetrominoBlock";
import {
  emptyGrid,
  freezeGrid,
  updateGrid,
  gridToString,
  calculateScore,
  clearCompleteLines,
  blockOnLeft,
  blockOnRight,
  blockUnderneath
} from "./utils";

export class TetrisGame implements Game {
  startingPosition = new TetrominoBlock(4, -2);

  gridWidth = 10;
  gridHeight = 10;
  grid = emptyGrid(this.gridWidth, this.gridHeight);

  currentTetromino = LShape.create(this.startingPosition);
  nextTetromino = LShape.create(this.startingPosition);

  score = 0;
  level = 0;

  onChange: (game: Game) => void;

  constructor(onChange: (game: Game) => void) {
    this.onChange = onChange;
  }

  rotateRight() {
    if (this.isRightRotationBlocked()) return;

    this.currentTetromino = this.currentTetromino.rotateRight();
    this.updateAndNotify();
  }

  rotateLeft() {
    if (this.isLeftRotationBlocked()) return;

    this.currentTetromino = this.currentTetromino.rotateLeft();
    this.updateAndNotify();
  }

  moveRight() {
    const canGoRight =
      !this.isTouchingRightEdge() && !this.isRightSideTouchingAFrozenBlock();

    if (canGoRight) {
      this.currentTetromino = this.currentTetromino.moveRight();
      this.updateAndNotify();
    }
  }

  moveLeft() {
    const canGoLeft =
      !this.isTouchingLeftEdge() && !this.isLeftSideTouchingAFrozenBlock();

    if (canGoLeft) {
      this.currentTetromino = this.currentTetromino.moveLeft();
      this.updateAndNotify();
    }
  }

  moveDown() {
    const canGoDown =
      !this.isTouchingBottom() && !this.isBottomTouchingAFrozenBlock();

    if (canGoDown) {
      this.currentTetromino = this.currentTetromino.moveDown();
      this.updateAndNotify();
    }
  }

  tick() {
    if (this.isCurrentTetrominoToBeFrozen()) {
      // At this point if any tetromino block is outside the grid
      // it is game over
      this.grid = freezeGrid(this.grid);

      const newScore = calculateScore(this);
      const newGrid = clearCompleteLines(this);

      this.score = this.score + newScore;
      this.grid = newGrid;
      this.currentTetromino = LShape.create(this.startingPosition);
    } else {
      this.moveDown();
    }

    this.updateAndNotify();
  }

  private isCurrentTetrominoToBeFrozen() {
    return this.isTouchingBottom() || this.isBottomTouchingAFrozenBlock();
  }

  private isTouchingLeftEdge() {
    return this.currentTetromino.blocks.find((block) => block.column === 0);
  }

  private isTouchingRightEdge() {
    return this.currentTetromino.blocks.find(
      (block) => block.column === this.gridWidth - 1
    );
  }

  private isTouchingBottom() {
    return this.currentTetromino.blocks.find((block) => {
      return block.line === this.gridHeight - 1;
    });
  }

  private isLeftSideTouchingAFrozenBlock() {
    const blocks = this.currentTetromino.blocks;

    const blocksOnLeft = blocks
      .filter((block) => this.isWithinGrid(block.column, block.line))
      .filter((block) => block.column - 1 >= 0)
      .map((block) => blockOnLeft(block));

    return blocksOnLeft.find(([column, line]) => {
      return this.grid[line][column].type === CellType.Frozen;
    });
  }

  private isRightSideTouchingAFrozenBlock() {
    const blocks = this.currentTetromino.blocks;

    const blocksOnRight = blocks
      .filter((block) => this.isWithinGrid(block.column, block.line))
      .filter((block) => block.column + 1 < this.gridWidth)
      .map((block) => blockOnRight(block));

    return blocksOnRight.find(([column, line]) => {
      return this.grid[line][column].type === CellType.Frozen;
    });
  }

  private isBottomTouchingAFrozenBlock() {
    const blocks = this.currentTetromino.blocks;

    const blocksUnderneath = blocks
      .filter((block) => this.isWithinGrid(block.column, block.line))
      .filter((block) => block.line + 1 < this.gridHeight)
      .map((block) => blockUnderneath(block));

    return blocksUnderneath.find(([column, line]) => {
      return this.grid[line][column].type === CellType.Frozen;
    });
  }

  private isLeftRotationBlocked() {
    const rotated = this.currentTetromino.rotateLeft();

    const overEdge = rotated.blocks.filter(
      (block) =>
        block.column < 0 ||
        block.column >= this.gridWidth ||
        block.line >= this.gridHeight
    );

    if (overEdge.length > 0) {
      return true;
    }

    const blocks = rotated.blocks;

    return blocks
      .filter((block) => block.line >= 0)
      .find((block) => {
        return this.grid[block.line][block.column].type === CellType.Frozen;
      });
  }

  private isRightRotationBlocked() {
    const rotated = this.currentTetromino.rotateRight();
    const overEdge = rotated.blocks.filter(
      (block) =>
        block.column < 0 ||
        block.column >= this.gridWidth ||
        block.line >= this.gridHeight
    );

    if (overEdge.length > 0) {
      return true;
    }

    const blocks = rotated.blocks;

    return blocks
      .filter((block) => block.line >= 0)
      .find((block) => {
        return this.grid[block.line][block.column].type === CellType.Frozen;
      });
  }

  private isWithinGrid(column: number, line: number) {
    const columnValid = column >= 0 && column < this.gridWidth - 1;
    const lineValid = line >= 0 && line < this.gridHeight - 1;

    return columnValid && lineValid;
  }

  updateAndNotify() {
    this.grid = updateGrid(this.grid, this.currentTetromino);
    this.onChange(this);
  }

  toString() {
    return gridToString(this.grid);
  }
}
