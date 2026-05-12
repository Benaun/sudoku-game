import { BOX_SIZE, GIRD_SIZE } from "./utilities.js";

export const generateSudoku = () => {
  const sudoku = createEmpyGrid();
  resolveSudoku(sudoku);
  return removeCells(sudoku);
};

const createEmpyGrid = () => {
  return Array(GIRD_SIZE)
    .fill()
    .map(() => Array(GIRD_SIZE).fill(null));
};

const resolveSudoku = (grid) => {
  const emptyCell = findEmptyCell(grid);
  if (!emptyCell) return true;

  const numbers = getRandomNumbers();

  for (let i = 0; i < numbers.length; i++) {
    if (!validate(grid, emptyCell.row, emptyCell.column, numbers[i])) continue;

    grid[emptyCell.row][emptyCell.column] = numbers[i];

    if (resolveSudoku(grid)) return true;

    grid[emptyCell.row][emptyCell.column] = null;
  }
};

export const findEmptyCell = (grid) => {
  for (let row = 0; row < GIRD_SIZE; row++) {
    for (let column = 0; column < GIRD_SIZE; column++) {
      if (grid[row][column] === null) return { row, column };
    }
  }
  return null;
};

const getRandomNumbers = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  for (let i = numbers.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[randomIndex]] = [numbers[randomIndex], numbers[i]];
  }

  return numbers;
};

const validate = (grid, row, column, value) => {
  return (
    validateColumn(grid, row, column, value) &&
    validateRow(grid, row, column, value) &&
    validateBox(grid, row, column, value)
  );
};

const validateColumn = (grid, row, column, value) => {
  for (let i = 0; i < GIRD_SIZE; i++) {
    if (grid[i][column] === value && i !== row) return false;
  }
  return true;
};

const validateRow = (grid, row, column, value) => {
  for (let i = 0; i < GIRD_SIZE; i++) {
    if (grid[row][i] === value && i !== column) return false;
  }
  return true;
};

const validateBox = (grid, row, column, value) => {
  const firstRowInBox = row - (row % BOX_SIZE);
  const firstColumnInBox = column - (column % BOX_SIZE);

  for (let i = firstRowInBox; i < firstRowInBox + BOX_SIZE; i++) {
    for (let j = firstColumnInBox; j < firstColumnInBox + BOX_SIZE; j++) {
      if (grid[i][j] === value && i !== row && j !== column) return false;
    }
  }
  return true;
};

const removeCells = (grid) => {
  const DIFFICULTY = 1;
  const resultGrid = [...grid].map((row) => [...row]);

  let i = 0;
  while (i < DIFFICULTY) {
    const row = Math.floor(Math.random() * GIRD_SIZE);
    const column = Math.floor(Math.random() * GIRD_SIZE);
    if (resultGrid[row][column] !== null) {
      resultGrid[row][column] = null;
      i++;
    }
  }

  return resultGrid;
};
