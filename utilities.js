export const GIRD_SIZE = 9;
export const BOX_SIZE = 3;

export const convertIndexToPosition = (index) => {
  return {
    row: Math.floor(index / GIRD_SIZE),
    column: index % GIRD_SIZE,
  };
};
