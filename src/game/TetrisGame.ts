import { Game, MoveableBlock } from "../types";
import { CellType, Grid, Tetromino, GameTapFn } from "../types";
import TetrominoBlock from "../tetrominos/TetrominoBlock";
import {
  emptyGrid,
  freezeGrid,
  updateGrid,
  gridToString,
  calculateScore,
  linesCleared,
  clearCompleteLines,
  blockOnLeft,
  blockOnRight,
  blockUnderneath,
  randomTetromino
} from "../utils";

interface TetrisGameParams {
  gridWidth: number;
  gridHeight: number;
}

export default class TetrisGame implements Game {
  grid: Grid;
  gridHeight: number;
  gridWidth: number;
  startingPosition: MoveableBlock;
  currentTetromino: Tetromino;
  nextTetromino: Tetromino;
  score = 0;
  level = 0;
  linesCleared = 0;
  gameOver = false;

  gridChangeListeners: GameTapFn[] = [];
  levelChangeListeners: GameTapFn[] = [];
  gameOverListeners: GameTapFn[] = [];

  constructor({ gridWidth, gridHeight }: TetrisGameParams) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.grid = emptyGrid(gridWidth, gridHeight);

    const midPoint = Math.floor(gridWidth / 2);

    this.startingPosition = new TetrominoBlock(midPoint, -2);
    this.currentTetromino = randomTetromino(this.startingPosition);
    this.nextTetromino = randomTetromino(this.startingPosition);
  }

  addGridChangeListener(fn: GameTapFn): Game {
    this.gridChangeListeners.push(fn);

    return this;
  }

  addLevelChangeListener(fn: GameTapFn): Game {
    this.levelChangeListeners.push(fn);

    return this;
  }

  addGameOverListener(fn: GameTapFn): Game {
    this.gameOverListeners.push(fn);

    return this;
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
      !this.gameOver &&
      !this.isTouchingRightEdge() &&
      !this.isRightSideTouchingAFrozenBlock();

    if (canGoRight) {
      this.currentTetromino = this.currentTetromino.moveRight();
      this.updateAndNotify();
    }
  }

  moveLeft() {
    const canGoLeft =
      !this.gameOver &&
      !this.isTouchingLeftEdge() &&
      !this.isLeftSideTouchingAFrozenBlock();

    if (canGoLeft) {
      this.currentTetromino = this.currentTetromino.moveLeft();
      this.updateAndNotify();
    }
  }

  moveDown() {
    const canGoDown =
      !this.gameOver &&
      !this.isTouchingBottom() &&
      !this.isBottomTouchingAFrozenBlock();

    if (canGoDown) {
      this.currentTetromino = this.currentTetromino.moveDown();
      this.updateAndNotify();
    }
  }

  tick() {
    if (this.isCurrentTetrominoToBeFrozen() && this.isOutsideGrid()) {
      this.gameOverListeners.forEach((listener) => listener(this));
      this.gameOver = true;
    } else if (this.isCurrentTetrominoToBeFrozen()) {
      // At this point if any tetromino block is outside the grid
      // it is game over
      this.grid = freezeGrid(this.grid);

      const newLinesCleared = linesCleared(this);
      const newScore = calculateScore(this);
      const newGrid = clearCompleteLines(this);

      this.score = this.score + newScore;
      this.linesCleared = this.linesCleared + newLinesCleared;
      this.grid = newGrid;
      this.currentTetromino = this.nextTetromino;
      this.nextTetromino = randomTetromino(this.startingPosition);

      const newLevel = this.calculateLevel();

      if (newLevel !== this.level) {
        this.level = newLevel;
        this.levelChangeListeners.forEach((listener) => listener(this));
      }
    } else {
      this.moveDown();
    }

    this.updateAndNotify();
  }

  private calculateLevel() {
    return Math.floor(this.linesCleared / 10);
  }

  private isOutsideGrid() {
    return this.currentTetromino.blocks.find(
      (block) => !this.isWithinGrid(block.column, block.line)
    );
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
    if (this.gameOver) return true;

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
    if (this.gameOver) return true;

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
    const columnValid = column >= 0 && column <= this.gridWidth - 1;
    const lineValid = line >= 0 && line <= this.gridHeight - 1;

    return columnValid && lineValid;
  }

  updateAndNotify() {
    this.grid = updateGrid(this.grid, this.currentTetromino);
    this.gridChangeListeners.forEach((listener) => listener(this));
  }

  toString() {
    return gridToString(this.grid);
  }
}
