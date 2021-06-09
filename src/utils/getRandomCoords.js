export const getRandomCoords = (areaWidth, blockWidth) => {
  const x =
    Math.floor(Math.random() * ((areaWidth - blockWidth) / blockWidth + 1)) *
    blockWidth;
  const y =
    Math.floor(Math.random() * ((areaWidth - blockWidth) / blockWidth + 1)) *
    blockWidth;
    
  return [x, y];
};
