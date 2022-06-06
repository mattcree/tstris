export enum CellType {
  Space = "Space",
  Frozen = "Frozen",
  Moveable = "Moveable"
}

export enum LineScore {
  Single = 40,
  Double = 100,
  Triple = 300,
  Quadruple = 1200
}

export interface Positionable {
  line: number;
  column: number;
}

export interface Cell {
  type: CellType;
}

export class Space implements Cell {
  type = CellType.Space;
}

export const space = new Space();

export class FrozenBlock implements Cell {
  type = CellType.Frozen;
}

export const frozenBlock = new FrozenBlock();

export interface MoveableBlock extends Cell, Positionable {
  left(change?: number): MoveableBlock;
  right(change?: number): MoveableBlock;
  up(change?: number): MoveableBlock;
  down(change?: number): MoveableBlock;
  toString(): string;
}

export type GridElement = Space | FrozenBlock | MoveableBlock;

export type GridLine = Array<GridElement>;

export type Grid = Array<GridLine>;

export type Orientation = "North" | "South" | "East" | "West";

export interface Tetromino {
  orientation: Orientation;
  blocks: Array<MoveableBlock>;
  midPoint: MoveableBlock;
  rotateLeft(): Tetromino;
  rotateRight(): Tetromino;
  moveLeft(): Tetromino;
  moveRight(): Tetromino;
  moveDown(): Tetromino;
}

export interface Game {
  gridWidth: number;
  gridHeight: number;
  score: number;
  linesCleared: number;
  level: number;
  gameOver: boolean;
  currentTetromino: Tetromino;
  nextTetromino: Tetromino;
  grid: Grid;
  tick(): void;
  rotateLeft(): void;
  rotateRight(): void;
  moveLeft(): void;
  moveRight(): void;
  moveDown(): void;
  addGridChangeListener: (fn: (game: Game) => void) => Game;
  addLevelChangeListener: (fn: (game: Game) => void) => Game;
  addGameOverListener: (fn: (game: Game) => void) => Game;
}

export type GameTapFn = (game: Game) => void;
