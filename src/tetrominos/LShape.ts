import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "../TetrominoBlock";

/*
  Shape:
    #
    #
    ##

  Will be created in the orientation shown above i.e. pointing 'North'
*/
export default class LShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;

  static create(
    startingCoordinate: MoveableBlock = new TetrominoBlock(0, 0)
  ): Tetromino {
    return new LShape(
      [
        startingCoordinate, // Top
        startingCoordinate.down(1), // Middle (axis block)
        startingCoordinate.down(2), // Bottom
        startingCoordinate.down(2).right(1) // Right of Bottom
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
        return new LShape(this.northToWest(), "West");
      case "West":
        return new LShape(this.westToSouth(), "South");
      case "South":
        return new LShape(this.southToEast(), "East");
      case "East":
        return new LShape(this.eastToNorth(), "North");
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return new LShape(this.northToEast(), "East");
      case "East":
        return new LShape(this.eastToSouth(), "South");
      case "South":
        return new LShape(this.southToWest(), "West");
      case "West":
        return new LShape(this.westToNorth(), "North");
    }
  }

  private northToEast(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.right(2),
      middle.up(1).right(1),
      bottom.up(2),
      rightBottom.left(1).up(1)
    ];
  }

  private northToWest(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.down(1),
      middle.right(1),
      bottom.up(1).right(2),
      rightBottom.up(2).right(1)
    ];
  }

  private westToSouth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.down(1).right(1),
      middle,
      bottom.up(1).left(1),
      rightBottom.left(2)
    ];
  }

  private westToNorth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.up(1),
      middle.left(1),
      bottom.down(1).left(2),
      rightBottom.down(2).left(1)
    ];
  }

  private southToWest(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.left(1).up(1),
      middle,
      bottom.right(1).down(1),
      rightBottom.right(2)
    ];
  }

  private southToEast(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.right(1).up(2),
      middle.up(1),
      bottom.left(1),
      rightBottom.down(1)
    ];
  }

  private eastToNorth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.left(2),
      middle.left(1).down(1),
      bottom.down(2),
      rightBottom.down(1).right(1)
    ];
  }

  private eastToSouth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.down(2).left(1),
      middle.down(1),
      bottom.right(1),
      rightBottom.up(1)
    ];
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new LShape(newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new LShape(newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new LShape(newCoordinates, this.orientation);
  }

  toString() {
    return JSON.stringify(this.blocks, null, 2);
  }
}
