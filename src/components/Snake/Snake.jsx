import React from 'react';
import SnakeIcon from './snake-icon.svg';
import styles from './Snake.module.css';

const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dot, idx) => {
        const style = {
          left: `${dot[0]}px`,
          top: `${dot[1]}px`
        };
        return <div className={styles.snakeDot} key={idx} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;
