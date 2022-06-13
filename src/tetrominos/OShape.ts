import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "./TetrominoBlock";

/*
O shaped Tetris block

Spawns in North facing orientation (the only orientation)
[ ][ ][ ][ ]
[ ][*][#][ ]
[ ][#][#][ ] 
[ ][ ][ ][ ]


The '*' indicates the midpoint 
*/
export default class OShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;
  midPoint: MoveableBlock;

  static create(midPoint: MoveableBlock = new TetrominoBlock(0, 0)): Tetromino {
    return OShape.facingNorth(midPoint);
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
    return this;
  }

  rotateRight() {
    return this;
  }

  static facingNorth(midPoint: MoveableBlock): OShape {
    return new OShape(
      midPoint,
      [
        midPoint, // Top
        midPoint.down(), // Middle
        midPoint.down().right(), // Bottom
        midPoint.right() // Right
      ],
      "North"
    );
  }

  moveLeft() {
    return OShape.facingNorth(this.midPoint.left());
  }

  moveRight() {
    return OShape.facingNorth(this.midPoint.right());
  }

  moveDown() {
    return OShape.facingNorth(this.midPoint.down());
  }

  toString() {
    return "        \n  [][]  \n  [][]  \n        ";
  }
}
