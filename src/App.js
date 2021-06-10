import React, { Component } from 'react';
import { getRandomCoords } from './utils/getRandomCoords';
import { Snake, Food } from './components';
// import { calcSnakeLength } from './utils/calcSnakeLength';
import ArrowIcon from './right-arrow.svg';

export default class App extends Component {
  SNAKE_PART_WIDTH = 20;
  SNAKE_PART_HEIGHT = 20;

  state = {
    width: null,
    height: null,
    snakePartWidth: this.SNAKE_PART_WIDTH,
    snakePartHeight: this.SNAKE_PART_HEIGHT,
    snakeDots: [
      [0, 0],
      [20, 0]
    ],
    direction: 'RIGHT',
    food: [0, 0],
    speed: 200,
    timeoutId: 0
  };

  componentDidMount() {
    const width = document.querySelector('.game-area').clientWidth;
    const height = document.querySelector('.game-area').clientHeight;
    this.setState({
      width,
      height,
      food: getRandomCoords(width, this.SNAKE_PART_WIDTH)
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

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + this.state.snakePartWidth, head[1]];
        break;

      case 'LEFT':
        head = head = [head[0] - this.state.snakePartWidth, head[1]];
        break;

      case 'UP':
        head = head = [head[0], head[1] - this.state.snakePartWidth];
        break;

      case 'DOWN':
        head = head = [head[0], head[1] + this.state.snakePartWidth];
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
    console.log(this.state.width, this.state.height);
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
      console.log('Съел');
      this.setState({
        food: getRandomCoords(this.state.width, this.SNAKE_PART_WIDTH)
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
      food: getRandomCoords(this.state.width, this.SNAKE_PART_WIDTH)
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
