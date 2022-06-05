import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "../TetrominoBlock";

/*
  Shape:
    ##
    ##

  Will be created in the orientation shown above i.e. pointing 'North'
*/
export default class OShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;

  static create(
    startingCoordinate: MoveableBlock = new TetrominoBlock(0, 0)
  ): Tetromino {
    return new OShape(
      [
        startingCoordinate, // Top
        startingCoordinate.right(1), // Middle
        startingCoordinate.right(1).down(1), // Bottom
        startingCoordinate.down(1) // Right of Bottom
      ],
      "North"
    );
  }

  private constructor(blocks: Array<MoveableBlock>, orientation: Orientation) {
    this.blocks = blocks;
    this.orientation = orientation;
  }

  rotateLeft() {
    return this;
  }

  rotateRight() {
    return this;
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new OShape(newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new OShape(newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new OShape(newCoordinates, this.orientation);
  }

  toString() {
    return JSON.stringify(this.blocks, null, 2);
  }
}
