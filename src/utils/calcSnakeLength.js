export const calcSnakeLength = array => {
  return array.reduce((sum, item) => {
    return item[0] + sum;
  }, 0);
};