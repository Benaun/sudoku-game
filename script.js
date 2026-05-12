import { Sudoku } from "./sudoku.js";
import { convertIndexToPosition, GIRD_SIZE } from "./utilities.js";

const sudoku = new Sudoku();
let cells;

const init = () => {
  initCells();
};

const initCells = () => {
  cells = document.querySelectorAll(".cell");
  fillCells();
};

const fillCells = () => {
  for (let i = 0; i < GIRD_SIZE * GIRD_SIZE; i++) {
    const { row, column } = convertIndexToPosition(i);

    if (sudoku.grid[row][column] !== null) {
      cells[i].classList.add("filled");
      cells[i].innerHTML = sudoku.grid[row][column];
    }
  }
};

init();
