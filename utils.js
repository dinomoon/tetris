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

export const moveBlocks = (state, onLeft, onRight, onTop, onDir, initial) => {
  const { type: blockType, dir, left, top, keyType } = state;
  let stop = false;
  let newBlocks = [];

  for (let i = 0; i < 4; i++) {
    let [x, y] = blocks[blockType][dir][i];
    let nx = x + left;
    let ny = y + top;

    // 테트리스 아래벽에서 더 가려고 할 때
    if (playGround.children[ny] === undefined) {
      stop = true;
      break;
    }

    // 테트리스 좌우벽에서 더 가려고 할 때
    if (playGround.children[ny].children[nx] === undefined) {
      stop = true;
      break;
    }

    // seize블럭이 있는 곳으로 가려고 할 때
    if (playGround.children[ny].children[nx].classList.contains('seize')) {
      stop = true;
      break;
    }

    newBlocks.push(playGround.children[ny].children[nx]);
  }

  // 더 이상 갈 수 없을 때
  if (stop) {
    switch (keyType) {
      case 'left':
        onRight();
        break;
      case 'right':
        onLeft();
        break;
      case 'up':
        onDir();
        break;
      case 'down':
        onTop();
        const { type: blockType, dir, left, top } = state;
        blocks[blockType][dir].forEach(v => {
          let x = v[0] + left;
          let y = v[1] + top;
          playGround.children[y].children[x].classList.remove('moving');
          playGround.children[y].children[x].classList.add(blockType, 'seize');
        });
        // 블록 새로 추가
        initial();
      default:
        break;
    }
    return;
  }

  removeCurrentBlocks(blockType);
  addNewBlocks(blockType, newBlocks);
};

export const randomBlockType = () => {
  const blockObj = {
    0: 'O',
    1: 'T',
    2: 'I',
    3: 'L',
    4: 'J',
    5: 'S',
    6: 'Z',
  };

  return blockObj[Math.floor(Math.random() * 7)];
};

export const render = (state, onLeft, onRight, onTop, onDir, initial) => {
  moveBlocks(state, onLeft, onRight, onTop, onDir, initial);
};
