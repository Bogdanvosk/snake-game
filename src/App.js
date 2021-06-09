import React, { Component } from 'react';
import { getRandomCoords } from './utils/getRandomCoords';
import { Snake, Food } from './components';
import ReactSwipeEvents from 'react-swipe-events';

const initialState = {
  snakeDots: [
    [0, 0],
    [20, 0]
  ],
  direction: 'RIGHT',
  food: getRandomCoords(600, 20),
  speed: 200
};

export default class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    // this.checkIfOutOfBorders();
    this.checlIfCollapsed();
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
        head = [head[0] + 20, head[1]];
        break;

      case 'LEFT':
        head = [head[0] - 20, head[1]];
        break;

      case 'UP':
        head = [head[0], head[1] - 20];
        break;

      case 'DOWN':
        head = [head[0], head[1] + 20];
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

  // checkIfOutOfBorders = () => {
  //   let head = this.state.snakeDots[this.state.snakeDots.length - 1];

  //   if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
  //     this.onGameOver();
  //   }
  // };

  checlIfCollapsed = () => {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();

    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  };

  checkIfEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoords()
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
        onSwipedUp={() => {
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
