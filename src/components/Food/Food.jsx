import React from 'react';
import styles from './Food.module.css';
import foodSvg from './apple.svg';

const Food = ({ dot }) => {
  const style = {
    left: `${dot[0]}px`,
    top: `${dot[1]}px`
  };
  return (
    <img
      src={foodSvg}
      alt='apple'
      className={styles.snakeFood}
      style={style}></img>
  );
};

export default Food;
