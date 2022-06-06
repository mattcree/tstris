import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
I shaped Tetris block

Spawns in east facing orientation
[ ][ ][ ][ ]
[ ][ ][ ][ ]
[#][*][#][#] 
[ ][ ][ ][ ]

The '*' indicates the midpoint 
*/
export default class IShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return IShape.facingEast(midPoint);
  }

  private constructor(
    midpoint: MoveableBlock,
    blocks: Array<MoveableBlock>,
    orientation: Orientation
  ) {
    this.blocks = blocks;
    this.midPoint = midpoint;
    this.orientation = orientation;
  }

  rotateLeft() {
    switch (this.orientation) {
      case "North":
        return IShape.facingEast(this.midPoint);
      default:
        return IShape.facingNorth(this.midPoint);
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return IShape.facingEast(this.midPoint);
      default:
        return IShape.facingNorth(this.midPoint);
    }
  }

  static facingNorth(midPoint: MoveableBlock): IShape {
    return new IShape(
      midPoint,
      [
        midPoint.up(2), // Top
        midPoint.up(), // Middle
        midPoint, // Bottom
        midPoint.down() // Right
      ],
      "North"
    );
  }

  static facingEast(midPoint: MoveableBlock): IShape {
    return new IShape(
      midPoint,
      [
        midPoint.right(2), // Top
        midPoint.right(), // Middle
        midPoint, // Bottom
        midPoint.left() // Right
      ],
      "East"
    );
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new IShape(this.midPoint.left(), newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new IShape(this.midPoint.right(), newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new IShape(this.midPoint.down(), newCoordinates, this.orientation);
  }

  toString() {
    switch (this.orientation) {
      case "North":
        return "[ ][#][ ][ ]\n[ ][#][ ][ ]\n[ ][*][ ][ ]\n[ ][#][ ][ ]";
      default:
        return "[ ][ ][ ][ ]\n[ ][ ][ ][ ]\n[#][*][#][#]\n[ ][ ][ ][ ]";
    }
  }
}
