import {
  initialState,
  moveLeft,
  moveRight,
  moveDown,
  changeDir,
} from './state.js';
import { drawTetris, render } from './utils.js';

// TODO:
// FIXME:

const App = () => {
  let state = { ...initialState };

  // 상태 변경 함수
  const changeState = callback => {
    state = callback(state);
    render(state, onLeft, onRight, onTop, onDir);
    console.log(state);
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
      default:
        break;
    }
  });

  drawTetris();
  render(state);
};

export default App;
