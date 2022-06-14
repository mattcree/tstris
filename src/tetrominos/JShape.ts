import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
J shaped Tetris block

Spawns in east facing orientation
[ ][ ][ ]
[#][*][#]
[ ][ ][#] 

The '*' indicates the midpoint 
*/
export default class JShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return JShape.facingEast(midPoint);
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
        return JShape.facingWest(this.midPoint);
      case "West":
        return JShape.facingSouth(this.midPoint);
      case "South":
        return JShape.facingEast(this.midPoint);
      case "East":
        return JShape.facingNorth(this.midPoint);
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return JShape.facingEast(this.midPoint);
      case "East":
        return JShape.facingSouth(this.midPoint);
      case "South":
        return JShape.facingWest(this.midPoint);
      case "West":
        return JShape.facingNorth(this.midPoint);
    }
  }

  static facingNorth(midPoint: MoveableBlock): JShape {
    return new JShape(
      midPoint,
      [
        midPoint.up(), // Top
        midPoint, // Middle
        midPoint.down(), // Bottom
        midPoint.down().left() // Right
      ],
      "North"
    );
  }

  static facingSouth(midPoint: MoveableBlock): JShape {
    return new JShape(
      midPoint,
      [
        midPoint.down(), // Top
        midPoint, // Middle
        midPoint.up(), // Bottom
        midPoint.up().right() // Right
      ],
      "South"
    );
  }

  static facingEast(midPoint: MoveableBlock): JShape {
    return new JShape(
      midPoint,
      [
        midPoint.left(), // Top
        midPoint, // Middle
        midPoint.right(), // Bottom
        midPoint.right().down() // Right
      ],
      "East"
    );
  }

  static facingWest(midPoint: MoveableBlock): JShape {
    return new JShape(
      midPoint,
      [
        midPoint.right(), // Top
        midPoint, // Middle
        midPoint.left(), // Bottom
        midPoint.left().up() // Right
      ],
      "West"
    );
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new JShape(this.midPoint.left(), newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new JShape(this.midPoint.right(), newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new JShape(this.midPoint.down(), newCoordinates, this.orientation);
  }

  toString() {
    switch (this.orientation) {
      case "North":
        return [
          "        ",
          "  []    ",
          "  []    ",
          "[][]    "
        ].join("\n")
      case "South":
        return [
          "        ",
          "  [][]  ",
          "  []    ",
          "  []    "
        ].join("\n")
      case "East":
        return [
          "        ",
          "[]      ",
          "[][][]  ",
          "        "
        ].join("\n") 
      case "West":
        return [
          "        ",
          "        ",
          "[][][]  ",
          "    []  "
        ].join("\n") 
    }
  }
}
