import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
Z shaped Tetris block

Spawns in West facing orientation
[ ][ ][ ]
[#][*][ ]
[ ][#][#] 


The '*' indicates the midpoint 
*/
export default class ZShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return ZShape.facingWest(midPoint);
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
        return ZShape.facingWest(this.midPoint);
      default:
        return ZShape.facingNorth(this.midPoint);
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return ZShape.facingWest(this.midPoint);
      default:
        return ZShape.facingNorth(this.midPoint);
    }
  }

  static facingNorth(midPoint: MoveableBlock): ZShape {
    return new ZShape(
      midPoint,
      [
        midPoint.up(), // Top
        midPoint, // Middle
        midPoint.left(), // Bottom
        midPoint.left().down() // Right
      ],
      "North"
    );
  }

  static facingWest(midPoint: MoveableBlock): ZShape {
    return new ZShape(
      midPoint,
      [
        midPoint.left(), // Top
        midPoint, // Middle
        midPoint.down(), // Bottom
        midPoint.down().right() // Right
      ],
      "West"
    );
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new ZShape(this.midPoint.left(), newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new ZShape(this.midPoint.right(), newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new ZShape(this.midPoint.down(), newCoordinates, this.orientation);
  }

  toString() {
    switch (this.orientation) {
      case "North":
        return "[ ][#][ ]\n[#][*][ ]\n[#][ ][ ]";
      default:
        return "[ ][ ][ ]\n[#][*][ ]\n[ ][#][#]";
    }
  }
}
