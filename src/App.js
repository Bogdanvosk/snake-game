import React, { Component } from 'react';
import { getRandomCoords } from './utils/getRandomCoords';
import { Snake, Food } from './components';
import ReactSwipeEvents from 'react-swipe-events';

const WINDOW_WIDTH = window.screen.width;
const WINDOW_HEIGHT = window.screen.height;

const SNAKE_PART_WIDTH = 20;
const SNAKE_PART_HEIGHT = 20;

const initialState = {
  windowWidth: WINDOW_WIDTH,
  windowHeight: WINDOW_HEIGHT,
  snakePartWidth: SNAKE_PART_WIDTH,
  snakePartHeight: SNAKE_PART_HEIGHT,
  snakeDots: [
    [0, 0],
    [20, 0]
  ],
  direction: 'RIGHT',
  food: getRandomCoords(WINDOW_WIDTH, SNAKE_PART_WIDTH),
  speed: 200
};

export default class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  onKeyDown = e => {
    // e = e || window.event
    switch (e.keyCode) {
      case 38:
        this.setState({
          direction: 'UP'
        });
        break;
      case 40:
        this.setState({
          direction: 'DOWN'
        });
        break;
      case 37:
        this.setState({
          direction: 'LEFT'
        });
        break;
      case 39:
        this.setState({
          direction: 'RIGHT'
        });
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'RIGHT':
        head =
          head[0] >= this.state.windowWidth
            ? [0, head[1]]
            : [head[0] + this.state.snakePartWidth, head[1]];
        break;

      case 'LEFT':
        head =
          head[0] <= 0
            ? [this.state.windowWidth, head[1]]
            : [head[0] - this.state.snakePartWidth, head[1]];
        break;

      case 'UP':
        head =
          head[1] <= 0
            ? [head[0], this.state.windowHeight]
            : [head[0], head[1] - this.state.snakePartHeight];
        break;

      case 'DOWN':
        head =
          head[1] >= this.state.windowHeight
            ? [head[0], 0]
            : [head[0], head[1] + this.state.snakePartHeight];
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
      } else if (
        head[0] >= this.state.windowWidth ||
        head[1] >= this.state.windowHeight
      ) {
        console.log('Преграда!');
        this.onGameOver();
      }
    });
  };

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      console.log('Съел');
      this.setState({
        food: getRandomCoords(WINDOW_WIDTH, SNAKE_PART_WIDTH)
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
    this.setState(initialState);
  };

  render() {
    return (
      <ReactSwipeEvents
        onSwipedLeft={() => {
          this.setState({
            direction: 'LEFT'
          });
        }}
        onSwipedRight={() => {
          this.setState({
            direction: 'RIGHT'
          });
        }}
        onSwipedUp={e => {
          e.preventDefault();
          this.setState({
            direction: 'UP'
          });
        }}
        onSwipedDown={() => {
          this.setState({
            direction: 'DOWN'
          });
        }}>
        <div className='game-area'>
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </ReactSwipeEvents>
    );
  }
}
