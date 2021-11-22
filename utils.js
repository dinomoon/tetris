import { playGround } from './dom.js';
import { GAME_ROWS, GAME_COLS } from './state.js';
import { blocks } from './blocks.js';

export const drawTetris = () => {
  for (let i = 0; i < GAME_ROWS; i++) {
    const row = document.createElement('div');
    for (let j = 0; j < GAME_COLS; j++) {
      const col = document.createElement('span');
      row.appendChild(col);
    }
    playGround.appendChild(row);
  }
};

export const removeCurrentBlocks = blockType => {
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(block => block.classList.remove(blockType, 'moving'));
};

export const addNewBlocks = (blockType, newBlocks) => {
  newBlocks.forEach(v => v.classList.add(blockType, 'moving'));
};

export const moveBlocks = (state, onLeft, onRight, onTop, onDir) => {
  const { type: blockType, dir, left, top, keyType } = state;
  let stop = false;
  let newBlocks = [];

  blocks[blockType][dir].forEach(v => {
    let x = v[0] + left;
    let y = v[1] + top;

    if (!playGround.children[y] || !playGround.children[y].children[x]) {
      stop = true;
    } else {
      newBlocks.push(playGround.children[y].children[x]);
    }
  });

  if (stop) {
    // 갈 수 없다면 이전 상태로 돌아가기
    switch (keyType) {
      case 'left':
        onRight();
        break;
      case 'right':
        onLeft();
        break;
      case 'down':
        onTop();
        break;
      case 'up':
        onDir();
        break;
      default:
        break;
    }
    return;
  }

  removeCurrentBlocks(blockType);
  addNewBlocks(blockType, newBlocks);
};

export const render = (state, onLeft, onRight, onTop, onDir) => {
  moveBlocks(state, onLeft, onRight, onTop, onDir);
};
