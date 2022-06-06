import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
T shaped Tetris block

Spawns in south facing orientation
[ ][ ][ ]
[#][*][#]
[ ][#][ ] 

The '*' indicates the midpoint 
*/
export default class TShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return TShape.facingSouth(midPoint);
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
        return TShape.facingWest(this.midPoint);
      case "West":
        return TShape.facingSouth(this.midPoint);
      case "South":
        return TShape.facingEast(this.midPoint);
      case "East":
        return TShape.facingNorth(this.midPoint);
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return TShape.facingEast(this.midPoint);
      case "East":
        return TShape.facingSouth(this.midPoint);
      case "South":
        return TShape.facingWest(this.midPoint);
      case "West":
        return TShape.facingNorth(this.midPoint);
    }
  }

  static facingNorth(midPoint: MoveableBlock): TShape {
    return new TShape(
      midPoint,
      [
        midPoint.left(), // Top
        midPoint, // Middle
        midPoint.right(), // Bottom
        midPoint.up() // Right
      ],
      "North"
    );
  }

  static facingSouth(midPoint: MoveableBlock): TShape {
    return new TShape(
      midPoint,
      [
        midPoint.left(), // Top
        midPoint, // Middle
        midPoint.right(), // Bottom
        midPoint.down() // Right
      ],
      "South"
    );
  }

  static facingEast(midPoint: MoveableBlock): TShape {
    return new TShape(
      midPoint,
      [
        midPoint.up(), // Top
        midPoint, // Middle
        midPoint.down(), // Bottom
        midPoint.right() // Right
      ],
      "East"
    );
  }

  static facingWest(midPoint: MoveableBlock): TShape {
    return new TShape(
      midPoint,
      [
        midPoint.up(), // Top
        midPoint, // Middle
        midPoint.down(), // Bottom
        midPoint.left() // Right
      ],
      "West"
    );
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new TShape(this.midPoint.left(), newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new TShape(this.midPoint.right(), newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new TShape(this.midPoint.down(), newCoordinates, this.orientation);
  }

  toString() {
    switch (this.orientation) {
      case "North":
        return "[ ][#][ ]\n[#][#][#]\n[ ][ ][ ]";
      case "South":
        return "[ ][ ][ ]\n[#][#][#]\n[ ][#][ ]";
      case "East":
        return "[ ][#][ ]\n[ ][#][#]\n[ ][#][ ]";
      case "West":
        return "[ ][#][ ]\n[#][#][ ]\n[ ][#][ ]";
    }
  }
}
