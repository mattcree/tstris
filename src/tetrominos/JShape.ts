import { MoveableBlock, Orientation, Tetromino } from "../types";
import TetrominoBlock from "../TetrominoBlock";

/*
  Shape:
    #
    #
    ##

  Will be created in the orientation shown above i.e. pointing 'North'
*/
export default class JShape implements Tetromino {
  blocks: Array<MoveableBlock>;
  orientation: Orientation;

  static create(
    startingCoordinate: MoveableBlock = new TetrominoBlock(0, 0)
  ): Tetromino {
    return new JShape(
      [
        startingCoordinate.right(1), // Top
        startingCoordinate.right(1).down(1), // Middle
        startingCoordinate.right(1).down(2), // Bottom
        startingCoordinate.down(2) // Right of Bottom
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
        return new JShape(this.northToWest(), "West");
      case "West":
        return new JShape(this.westToSouth(), "South");
      case "South":
        return new JShape(this.southToEast(), "East");
      case "East":
        return new JShape(this.eastToNorth(), "North");
    }
  }

  rotateRight() {
    switch (this.orientation) {
      case "North":
        return new JShape(this.northToEast(), "East");
      case "East":
        return new JShape(this.eastToSouth(), "South");
      case "South":
        return new JShape(this.southToWest(), "West");
      case "West":
        return new JShape(this.westToNorth(), "North");
    }
  }

  private northToEast(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.down(1).right(1),
      middle,
      bottom.left(1).up(1),
      rightBottom.up(2)
    ];
  }

  private northToWest(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.left(1),
      middle.up(1),
      bottom.right(1).up(2),
      rightBottom.right(2).up(1)
    ];
  }

  private westToSouth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.down(2),
      middle.left(1).down(1),
      bottom.left(2),
      rightBottom.left(1).up(1)
    ];
  }

  private westToNorth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.right(1),
      middle.down(1),
      bottom.left(1).down(2),
      rightBottom.down(1).left(2)
    ];
  }

  private southToWest(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.up(2),
      middle.right(1).up(1),
      bottom.right(2),
      rightBottom.right(1).down(1)
    ];
  }

  private southToEast(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.up(1).right(2),
      middle.right(1),
      bottom.down(1),
      rightBottom.left(1)
    ];
  }

  private eastToNorth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.up(1).left(2),
      middle,
      bottom.down(1).right(1),
      rightBottom.down(2)
    ];
  }

  private eastToSouth(): Array<MoveableBlock> {
    const [top, middle, bottom, rightBottom] = this.blocks;

    return [
      top.left(2).down(1),
      middle.left(1),
      bottom.up(1),
      rightBottom.right(1)
    ];
  }

  moveLeft() {
    const newCoordinates = this.blocks.map((block) => block.left(1));
    return new JShape(newCoordinates, this.orientation);
  }

  moveRight() {
    const newCoordinates = this.blocks.map((block) => block.right(1));
    return new JShape(newCoordinates, this.orientation);
  }

  moveDown() {
    const newCoordinates = this.blocks.map((block) => block.down(1));
    return new JShape(newCoordinates, this.orientation);
  }

  toString() {
    return JSON.stringify(this.blocks, null, 2);
  }
}
