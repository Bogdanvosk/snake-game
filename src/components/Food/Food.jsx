import React from 'react';
import styles from './Food.module.css';

const Food = ({ dot }) => {
  const style = {
    left: `${dot[0]}%`,
    top: `${dot[1]}%`
  };
  return <div className={styles.snakeFood} style={style}></div>;
};

export default Food;
