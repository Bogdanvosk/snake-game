import React from 'react';
import BombIcon from './bomb.svg';
import styles from './bomb.module.css';

const Bomb = ({ dot }) => {
  const style = {
    left: `${dot[0]}px`,
    top: `${dot[1]}px`
  };
  return (
    <img style={style} className={styles.bomb} src={BombIcon} alt='Bomb' />
  );
};

export default Bomb;
