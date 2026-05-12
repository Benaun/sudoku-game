import { findEmptyCell, generateSudoku } from "./sudoku-generator.js";
import { BOX_SIZE, GIRD_SIZE } from "./utilities.js";

export class Sudoku {
  constructor() {
    this.grid = generateSudoku();
  }

  getDuolicatePositions(row, column, value) {
    const duplicatesInColumn = this.getDuplicatePositionsInColumn(
      row,
      column,
      value,
    );

    const duplicatesInRow = this.getDuplicatePositionsInRow(row, column, value);

    const duplicatesInBox = this.getDuplicatePositionsInBox(row, column, value);

    const duplicates = [...duplicatesInColumn, ...duplicatesInRow];
    duplicatesInBox.forEach((duplicateInBox) => {
      if (duplicateInBox.row !== row && duplicateInBox.column !== column)
        duplicates.push(duplicateInBox);
    });

    return duplicates;
  }

  getDuplicatePositionsInColumn(row, column, value) {
    const duplicates = [];
    for (let i = 0; i < GIRD_SIZE; i++) {
      if (this.grid[i][column] === value && i !== row) {
        duplicates.push({ row: i, column });
      }
    }
    return duplicates;
  }

  getDuplicatePositionsInRow(row, column, value) {
    const duplicates = [];
    for (let i = 0; i < GIRD_SIZE; i++) {
      if (this.grid[row][i] === value && i !== column) {
        duplicates.push({ row, column: i });
      }
    }
    return duplicates;
  }

  getDuplicatePositionsInBox(row, column, value) {
    const duplicates = [];
    const firstRowInBox = row - (row % BOX_SIZE);
    const firstColumnInBox = column - (column % BOX_SIZE);

    for (let i = firstRowInBox; i < firstRowInBox + BOX_SIZE; i++) {
      for (let j = firstColumnInBox; j < firstColumnInBox + BOX_SIZE; j++) {
        if (this.grid[i][j] === value && i !== row && j !== column) {
          duplicates.push({ row: i, column: j });
        }
      }
    }
    return duplicates;
  }

  hasEmptyCells() {
    return Boolean(findEmptyCell(this.grid));
  }
}
