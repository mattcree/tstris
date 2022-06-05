import { CellType, MoveableBlock } from "./types";

export default class TetrominoBlock implements MoveableBlock {
  type = CellType.Moveable;
  column: number;
  line: number;

  constructor(column: number, line: number) {
    this.column = column;
    this.line = line;
  }

  left(change: number) {
    return new TetrominoBlock(this.column - change, this.line);
  }

  right(change: number) {
    return new TetrominoBlock(this.column + change, this.line);
  }

  up(change: number) {
    return new TetrominoBlock(this.column, this.line - change);
  }

  down(change: number) {
    return new TetrominoBlock(this.column, this.line + change);
  }
}
