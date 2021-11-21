import { blocks } from './blocks.js';
import { GAME_ROWS, initialState } from './state.js';
import {
  drawInitialTetris,
  getWidth,
  getHeight,
  getLeft,
  getTop,
} from './utils.js';
import { playGround } from './dom.js';
import { GAME_COLS } from './state.js';

const app = () => {
  let state = { ...initialState };

  drawInitialTetris();

  const render = () => {
    const { type, dir, left, top } = state;
    // console.log(left);
    const movingBlocks = document.querySelectorAll('.moving');
    movingBlocks.forEach(block => block.classList.remove(type, 'moving'));
    blocks[type][dir].forEach(v => {
      let x = v[0] + top;
      let y = v[1] + left;
      playGround.children[x].children[y].classList.add(type, 'moving');
    });
  };

  render();

  document.body.addEventListener('keydown', e => {
    let left;
    switch (e.key) {
      case 'ArrowLeft':
        left = getLeft(state);
        if (left > 0) {
          state.left--;
          render();
        }
        break;
      case 'ArrowRight':
        left = getLeft(state);
        if (left + getWidth(state) < GAME_COLS) {
          state.left++;
          render();
        }
        break;
      case 'ArrowDown':
        let top = getTop(state);
        if (top + getHeight(state) < GAME_ROWS) {
          state.top++;
          render();
        }
        break;
      case 'ArrowUp':
        state.dir = state.dir === 3 ? 0 : ++state.dir;
        render();
        break;
      default:
        break;
    }
  });
};

export default app;
