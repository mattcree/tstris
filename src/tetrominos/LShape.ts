import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
L shaped Tetris block

Spawns in east facing orientation
[ ][ ][ ]
[#][*][#]
[#][ ][ ] 

The '*' indicates the midpoint 
*/
export default class LShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return LShape.facingEast(midPoint);
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
        return LShape.facingWest(this.midPoint);
      case "West":
        return LShape.facingSouth(this.midPoint);
      case "South":
        return LShape.facingEast(this.midPoint);
      case "East":
        return LShape.facingNorth(this.midPoint);
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return LShape.facingEast(this.midPoint);
      case "East":
        return LShape.facingSouth(this.midPoint);
      case "South":
        return LShape.facingWest(this.midPoint);
      case "West":
        return LShape.facingNorth(this.midPoint);
    }
  }

  static facingNorth(midPoint: MoveableBlock): LShape {
    return new LShape(
      midPoint,
      [
        midPoint.up(), // Top
        midPoint, // Middle
        midPoint.down(), // Bottom
        midPoint.down().right() // Right
      ],
      "North"
    );
  }

  static facingSouth(midPoint: MoveableBlock): LShape {
    return new LShape(
      midPoint,
      [
        midPoint.down(), // Top
        midPoint, // Middle
        midPoint.up(), // Bottom
        midPoint.up().left() // Right
      ],
      "South"
    );
  }

  static facingEast(midPoint: MoveableBlock): LShape {
    return new LShape(
      midPoint,
      [
        midPoint.right(), // Top
        midPoint, // Middle
        midPoint.left(), // Bottom
        midPoint.left().down() // Right
      ],
      "East"
    );
  }

  static facingWest(midPoint: MoveableBlock): LShape {
    return new LShape(
      midPoint,
      [
        midPoint.left(), // Top
        midPoint, // Middle
        midPoint.right(), // Bottom
        midPoint.right().up() // Right
      ],
      "West"
    );
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new LShape(this.midPoint.left(), newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new LShape(this.midPoint.right(), newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new LShape(this.midPoint.down(), newCoordinates, this.orientation);
  }

  toString() {
    switch (this.orientation) {
      case "North":
        return "  []  \n  []  \n  [][]";
      case "South":
        return "[][]  \n  []  \n  []  ";
      case "East":
        return "[]    \n[][][]\n      ";
      case "West":
        return "    []\n[][][]\n      ";
    }
  }
}
