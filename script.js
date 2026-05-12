import { Sudoku } from "./sudoku.js";
import {
  convertIndexToPosition,
  convertPositionToIndex,
  GIRD_SIZE,
} from "./utilities.js";

const sudoku = new Sudoku();
let cells;
let selectedCellIndex;
let selectedCell;

const init = () => {
  initCells();
  initCellsEvent();
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

const initCellsEvent = () => {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => onCellClick(cell, index));
  });
};

const onCellClick = (cell, index) => {
  cells.forEach((cell) => cell.classList.remove("selected", "highlighted"));

  if (cell.classList.contains("filled")) {
    selectedCellIndex = null;
    selectedCell = null;
  } else {
    selectedCellIndex = index;
    selectedCell = cell;
    cell.classList.add("selected");
    highLightCellBy(index);
  }
};

const highLightCellBy = (index) => {
  highLightColumnBy(index);
  highLightRowBy(index);
};

const highLightColumnBy = (index) => {
  const column = index % GIRD_SIZE;
  for (let i = 0; i < GIRD_SIZE; i++) {
    const cellIndex = convertPositionToIndex(i, column);
    cells[cellIndex].classList.add("highlighted");
  }
};

const highLightRowBy = (index) => {
  const row = Math.floor(index / GIRD_SIZE);
  for (let i = 0; i < GIRD_SIZE; i++) {
    const cellIndex = convertPositionToIndex(row, i);
    cells[cellIndex].classList.add("highlighted");
  }
};

init();
