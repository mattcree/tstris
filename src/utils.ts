import { frozenBlock, LineScore } from "./types";
import {
  CellType,
  Grid,
  GridLine,
  GridElement,
  Tetromino,
  Game,
  MoveableBlock,
  space
} from "./types";
import IShape from "./tetrominos/IShape";
import LShape from "./tetrominos/LShape";
import OShape from "./tetrominos/OShape";
import JShape from "./tetrominos/JShape";
import TShape from "./tetrominos/TShape";
import SShape from "./tetrominos/SShape";
import ZShape from "./tetrominos/SShape";

import { sample, zip, flattenDeep } from "lodash";

export const emptyLine = (width: number): GridLine => {
  return new Array(width).fill(space);
};

export const emptyGrid = (width: number, height: number): Grid => {
  return new Array(height).fill(emptyLine(width));
};

const updateLine = (
  line: GridLine,
  lineNumber: number,
  currentTetromino: Tetromino
): GridLine => {
  return line.reduce((acc, gridCell, columnNumber) => {
    const blockInCell = currentTetromino.blocks.find((block) => {
      return block.column === columnNumber && block.line === lineNumber;
    });

    if (blockInCell) {
      return [...acc, blockInCell];
    } else if (gridCell.type === CellType.Frozen) {
      return [...acc, gridCell];
    } else {
      return [...acc, space];
    }
  }, new Array<GridElement>());
};

export function updateGrid(grid: Grid, currentTetromino: Tetromino): Grid {
  return grid.reduce((acc, line, lineIndex) => {
    const newLine = updateLine(line, lineIndex, currentTetromino);
    return [...acc, newLine];
  }, new Array<GridLine>());
}

export function freezeGrid(grid: Grid): Grid {
  return grid.map((line) => {
    return line.map((cell) => {
      if (cell.type === CellType.Moveable) {
        return frozenBlock;
      } else {
        return cell;
      }
    });
  });
}

export const gridLineToString = (gridLine: GridLine): string => {
  const line = gridLine.map((cell: GridElement) => {
    switch (cell.type) {
      case CellType.Frozen:
        return "[]";
      case CellType.Moveable:
        return "[]";
      default:
        return "  ";
    }
  });

  return ["|", ...line, "|"].join("");
};

export const gridToString = (grid: Grid): string => {
  const [firstLine] = grid;
  const lines = grid.map(gridLineToString);

  const horizontalLine = repeatString("==", firstLine.length + 1);

  return [horizontalLine, ...lines, horizontalLine].join("\n");
};

const repeat = (character: string, times: number) => {
  return new Array(times).fill(character)
}

const repeatString = (character: string, times: number, joinWith: string = "") => {
  return repeat(character, times).join(joinWith);
}

export const inBox = (text: string) => {
  const lines = text.split("\n");
  const longest = Math.max(...lines.map(it => it.length));

  
  const horizontalLine = repeatString("=", longest + 4);

  const boxed = lines.map(line => {
    const paddingLength = longest - line.length;
    const padding = repeatString(" ", paddingLength);

    return `| ${line}${padding} |`;
  })

  return [horizontalLine, ...boxed, horizontalLine].join("\n");
}

export const horizontal = (...sections: string[]) => {
  const sectionLines = sections.map(section => padSection(section.split("\n")));
  const tallestColumn = Math.max(...sectionLines.map(it => it.length));

  const combinedSections = sectionLines.map(column => {
    const paddingLinesLength = tallestColumn - column.length;
    const widestLength = Math.max(...column.map(it => it.length));

    const paddingLine = repeatString(" ", widestLength);
    const padding = repeat(paddingLine, paddingLinesLength);

    return [...column, ...padding];
  })

  return zip(...combinedSections).map(it => it.join(" ")).join("\n");
}

export const vertical = (...sections: string[]) => {
  const paddedSections = sections.map(section => padSection(section.split("\n")));
  const [[firstLine]] = paddedSections;
  const width = firstLine.length;
  const paddingLine = repeatString(" ", width);

  return paddedSections.map(section => section.join("\n")).join(`\n${paddingLine}\n`)
}

const padSection = (column: string[]) => {
  const widestLine = Math.max(...column.map(it => it.length));

  return column.map(line => {
    const paddingLength = widestLine - line.length;

    const padding = repeatString(" ", paddingLength);
    
    return `${line}${padding}`
  })
}

export const linesCleared = (game: Game): number => {
  return game.grid.filter((line) => line.every((cell) => cell === frozenBlock))
    .length;
};

export const calculateScore = (game: Game): number => {
  const newLinesCleared = linesCleared(game);

  switch (newLinesCleared) {
    case 1:
      return LineScore.Single * (game.level + 1);
    case 2:
      return LineScore.Double * (game.level + 1);
    case 3:
      return LineScore.Triple * (game.level + 1);
    case 4:
      return LineScore.Quadruple * (game.level + 1);
    default:
      return 0;
  }
};

export const clearCompleteLines = (game: Game): Grid => {
  const linesNotCleared = game.grid.filter(
    (line) => !line.every((cell) => cell === frozenBlock)
  );
  const numberOfLinesCleared = game.grid.length - linesNotCleared.length;

  const emptyLines = [];

  for (let i = 0; i < numberOfLinesCleared; i++) {
    emptyLines.push(emptyLine(game.gridWidth));
  }

  return emptyLines.concat(linesNotCleared);
};

export function blockOnLeft(block: MoveableBlock): number[] {
  const column = block.column;
  const line = block.line;

  return [column - 1, line];
}

export function blockOnRight(block: MoveableBlock): number[] {
  const column = block.column;
  const line = block.line;

  return [column + 1, line];
}

export function blockUnderneath(block: MoveableBlock): number[] {
  const column = block.column;
  const line = block.line;

  return [column, line + 1];
}

export const randomTetromino = (position: MoveableBlock): Tetromino => {
  return (sample([
    OShape.create(position),
    IShape.create(position),
    LShape.create(position),
    JShape.create(position),
    TShape.create(position),
    SShape.create(position),
    ZShape.create(position)
  ]) as unknown) as Tetromino;
};
