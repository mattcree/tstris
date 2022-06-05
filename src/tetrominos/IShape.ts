import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "../TetrominoBlock";

/*
  Shape:
    #
    #
    #
    #

  Will be created in the orientation shown above i.e. pointing 'North'
*/
export default class IShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;

  static create(
    startingCoordinate: MoveableBlock = new TetrominoBlock(0, 0)
  ): Tetromino {
    return new IShape(
      [
        startingCoordinate, // Top
        startingCoordinate.down(1), // Middle
        startingCoordinate.down(2), // Bottom
        startingCoordinate.down(3) // Right of Bottom
      ],
      "North"
    );
  }

  private constructor(blocks: Array<MoveableBlock>, orientation: Orientation) {
    this.blocks = blocks;
    this.orientation = orientation;
  }

  rotateLeft() {
    switch (this.orientation) {
      case "North":
        return new IShape(this.longToFlat(), "West");
      case "West":
        return new IShape(this.flatToLong(), "South");
      case "South":
        return new IShape(this.longToFlat(), "East");
      case "East":
        return new IShape(this.flatToLong(), "North");
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return new IShape(this.longToFlat(), "East");
      case "East":
        return new IShape(this.flatToLong(), "South");
      case "South":
        return new IShape(this.longToFlat(), "West");
      case "West":
        return new IShape(this.flatToLong(), "North");
    }
  }

  private longToFlat() {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top,
      middle.right(1).up(1),
      bottom.right(2).up(2),
      rightBottom.right(3).up(3)
    ];
  }

  private flatToLong() {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top,
      middle.left(1).down(1),
      bottom.left(2).down(2),
      rightBottom.left(3).down(3)
    ];
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new IShape(newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new IShape(newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new IShape(newCoordinates, this.orientation);
  }

  toString() {
    return JSON.stringify(this.blocks, null, 2);
  }
}
