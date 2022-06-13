import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
S shaped Tetris block

Spawns in East facing orientation
[ ][ ][ ]
[ ][*][#]
[#][#][ ] 


The '*' indicates the midpoint 
*/
export default class SShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return SShape.facingEast(midPoint);
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
        return SShape.facingEast(this.midPoint);
      default:
        return SShape.facingNorth(this.midPoint);
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return SShape.facingEast(this.midPoint);
      default:
        return SShape.facingNorth(this.midPoint);
    }
  }

  static facingNorth(midPoint: MoveableBlock): SShape {
    return new SShape(
      midPoint,
      [
        midPoint.left().up(), // Top
        midPoint.left(), // Middle
        midPoint, // Bottom
        midPoint.down() // Right
      ],
      "North"
    );
  }

  static facingEast(midPoint: MoveableBlock): SShape {
    return new SShape(
      midPoint,
      [
        midPoint.right(), // Top
        midPoint, // Middle
        midPoint.down(), // Bottom
        midPoint.down().left() // Right
      ],
      "East"
    );
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new SShape(this.midPoint.left(), newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new SShape(this.midPoint.right(), newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new SShape(this.midPoint.down(), newCoordinates, this.orientation);
  }

  toString() {
    switch (this.orientation) {
      case "North":
        return "[]    \n[][]  \n  []  ";
      default:
        return "      \n  [][]\n[][]  ";
    }
  }
}
