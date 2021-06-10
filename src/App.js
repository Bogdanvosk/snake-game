import React, { Component } from 'react';
import { Snake, Food } from './components';
// import { calcSnakeLength } from './utils/calcSnakeLength';
import ArrowIcon from './right-arrow.svg';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      height: null,
      snakeSize: 20,
      snakeDots: [
        [0, 0],
        [20, 0]
      ],
      direction: 'RIGHT',
      food: [0, 0],
      speed: 200,
      timeoutId: 0
    };
  }

  componentDidMount() {
    const width = document.querySelector('.game-area').clientWidth;
    const height = document.querySelector('.game-area').clientHeight;
    this.setState({
      width,
      height,
      food: this.getRandomCoords(width, height)
    });

    setInterval(this.moveSnake, this.state.speed);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeoutId);
  }

  componentDidUpdate() {
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  getRandomCoords = (width, height) => {
    return [
      Math.floor(
        Math.random() *
          ((width - this.state.snakeSize) / this.state.snakeSize + 1)
      ) * this.state.snakeSize,
      Math.floor(
        Math.random() *
          ((height - this.state.snakeSize) / this.state.snakeSize + 1)
      ) * this.state.snakeSize
    ];
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + this.state.snakeSize, head[1]];
        break;

      case 'LEFT':
        head = head = [head[0] - this.state.snakeSize, head[1]];
        break;

      case 'UP':
        head = head = [head[0], head[1] - this.state.snakeSize];
        break;

      case 'DOWN':
        head = head = [head[0], head[1] + this.state.snakeSize];
        break;

      default:
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    });
  };

  checkIfCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();

    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
    if (
      head[0] >= this.state.width ||
      head[0] < 0 ||
      head[1] >= this.state.height ||
      head[1] < 0
    ) {
      this.onGameOver();
    }
  };

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: this.getRandomCoords(this.state.width, this.state.height)
      });
      this.enlargeSnake();
    }
  };

  enlargeSnake = () => {
    const newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake
    });
  };

  onGameOver = () => {
    alert(`Game over. Snake length is ${this.state.snakeDots.length}`);
    this.setState({
      snakeDots: [
        [0, 0],
        [20, 0]
      ],
      direction: 'RIGHT',
      food: this.getRandomCoords(this.state.width, this.state.height)
    });
  };

  render() {
    return (
      <div className='wrapper'>
        <div className='game-area' id='game-area'>
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
        <div className='controller-container'>
          <button
            className='up'
            onClick={() => {
              this.setState({
                direction: 'UP'
              });
            }}>
            <img src={ArrowIcon} alt='' />
          </button>
          <button
            className='right'
            onClick={() => {
              this.setState({
                direction: 'RIGHT'
              });
            }}>
            <img src={ArrowIcon} alt='' />
          </button>
          <button
            className='left'
            onClick={() => {
              this.setState({
                direction: 'LEFT'
              });
            }}>
            <img src={ArrowIcon} alt='' />
          </button>
          <button
            className='down'
            onClick={() => {
              this.setState({
                direction: 'DOWN'
              });
            }}>
            <img src={ArrowIcon} alt='' />
          </button>
        </div>
      </div>
    );
  }
}
