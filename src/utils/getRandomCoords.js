export const getRandomCoords = (areaWidth, blockWidth) => {
  // const min = 1;
  // const max = 98;

  const x =
    Math.floor(Math.random() * ((areaWidth - blockWidth) / blockWidth + 1)) *
    blockWidth;
  const y =
    Math.floor(Math.random() * ((areaWidth - blockWidth) / blockWidth + 1)) *
    blockWidth;

  // const x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  // const y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  return [x, y];
};
