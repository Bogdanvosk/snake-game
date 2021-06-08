import React from 'react';
import styles from './Snake.module.css';

const Snake = ({ snakeDots }) => {
  return (
    <div>
      {snakeDots.map((dot, idx) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`
        };
        return <div className={styles.snakeDot} key={idx} style={style}></div>;
      })}
    </div>
  );
};

export default Snake;
