import React from 'react';
import styles from './Food.module.css';

const Food = ({ dot }) => {
  const style = {
    left: `${dot[0]}px`,
    top: `${dot[1]}px`
  };
  return <div className={styles.snakeFood} style={style}></div>;
};

export default Food;
