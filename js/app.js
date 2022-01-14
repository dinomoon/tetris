import { level } from './dom.js';
import {
  initialState,
  moveLeft,
  moveRight,
  moveDown,
  changeDir,
} from './state.js';
import {
  drawNextBlock,
  drawTetris,
  randomBlockType,
  randomDir,
  render,
} from './utils.js';

const App = () => {
  let state = {
    ...initialState,
    type: randomBlockType(),
    nextBlockType: randomBlockType(),
    dir: randomDir(),
    nextBlockDir: randomDir(),
  };

  // 상태 변경 함수
  const changeState = callback => {
    state = callback(state);
    render(state, onLeft, onRight, onTop, onDir, initial, onStop);
  };

  const onLeft = () => {
    state.left--;
  };

  const onRight = () => {
    state.left++;
  };

  const onTop = () => {
    state.top--;
  };

  const onDir = () => {
    state.dir--;
    if (state.dir === -1) {
      state.dir = 3;
    }
  };

  const onStop = () => {
    state.stop = true;
  };

  const initial = () => {
    changeState(() => ({
      ...initialState,
      type: state.nextBlockType,
      nextBlockType: randomBlockType(),
      dir: state.nextBlockDir,
      nextBlockDir: randomDir(),
    }));
    drawNextBlock(state);

    let curLevel = +level.textContent;
    let interval;
    if (curLevel < 7) {
      interval = state.interval - curLevel * 100;
    } else {
      interval = state.interval - 650;
    }
    state.intervalId = setInterval(() => {
      changeState(moveDown);
    }, interval);
  };

  state.intervalId = setInterval(() => {
    changeState(moveDown);
  }, state.interval);

  document.body.addEventListener('keydown', e => {
    switch (e.key) {
      case 'ArrowLeft':
        changeState(moveLeft);
        break;
      case 'ArrowRight':
        changeState(moveRight);
        break;
      case 'ArrowDown':
        changeState(moveDown);
        break;
      case 'ArrowUp':
        changeState(changeDir);
        break;
      case ' ': // Spacebar
        while (!state.stop) {
          changeState(moveDown);
        }
        break;
      default:
        break;
    }
  });

  drawTetris();
  drawNextBlock(state);
  render(state);
};

export default App;
