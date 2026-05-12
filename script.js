import { Sudoku } from "./sudoku.js";
import {
  BOX_SIZE,
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
  initNumbers();
};

const initCells = () => {
  cells = document.querySelectorAll(".cell");
  fillCells();
  initCellsEvent();
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

const onCellClick = (clickedCell, index) => {
  cells.forEach((cell) =>
    cell.classList.remove("selected", "highlighted", "error"),
  );

  if (clickedCell.classList.contains("filled")) {
    selectedCellIndex = null;
    selectedCell = null;
  } else {
    selectedCellIndex = index;
    selectedCell = clickedCell;
    clickedCell.classList.add("selected");
    highLightCellBy(index);
  }

  if (clickedCell.innerHTML === "") return;
  cells.forEach((cell) => {
    if (cell.innerHTML === clickedCell.innerHTML)
      cell.classList.add("selected");
  });
};

const highLightCellBy = (index) => {
  highLightColumnBy(index);
  highLightRowBy(index);
  highLightBoxBy(index);
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

const highLightBoxBy = (index) => {
  const column = index % GIRD_SIZE;
  const row = Math.floor(index / GIRD_SIZE);
  const firstRowOnBox = row - (row % BOX_SIZE);
  const firstColumnInBox = column - (column % BOX_SIZE);

  for (let i = firstRowOnBox; i < firstRowOnBox + BOX_SIZE; i++) {
    for (let j = firstColumnInBox; j < firstColumnInBox + BOX_SIZE; j++) {
      const cellIndex = convertPositionToIndex(i, j);
      cells[cellIndex].classList.add("highlighted");
    }
  }
};

const initNumbers = () => {
  const numbers = document.querySelectorAll(".number");
  numbers.forEach((number) => {
    number.addEventListener("click", () =>
      onNumberClick(Number(number.innerHTML)),
    );
  });
};

const onNumberClick = (number) => {
  if (!selectedCell) return;
  if (selectedCell.classList.contains("filled")) return;

  cells.forEach((cell) =>
    cell.classList.remove("error", "shake", "zoom", "selected"),
  );
  selectedCell.classList.add("selected");
  setValueInSelectedCell(number);
};

const setValueInSelectedCell = (value) => {
  const { row, column } = convertIndexToPosition(selectedCellIndex);
  const duplicatesPositions = sudoku.getDuplicatePositions(row, column, value);
  if (duplicatesPositions.length) {
    highLightDuplicates(duplicatesPositions);
    return;
  }
  sudoku.grid[row][column] = value;
  selectedCell.innerHTML = value;
  setTimeout(() => selectedCell.classList.add("zoom"), 0);
};

const highLightDuplicates = (duplicatesPositions) => {
  duplicatesPositions.forEach((duplicate) => {
    const index = convertPositionToIndex(duplicate.row, duplicate.column);
    setTimeout(() => cells[index].classList.add("error", "shake"), 0);
  });
};

init();
