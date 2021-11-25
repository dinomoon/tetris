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

const makeSeize = state => {
  const { type: blockType, dir, left, top } = state;
  blocks[blockType][dir].forEach(v => {
    let x = v[0] + left;
    let y = v[1] + top;
    playGround.children[y].children[x].classList.remove('moving');
    playGround.children[y].children[x].classList.add(blockType, 'seize');
  });
};

const breakBlocks = () => {
  // 없앨 수 있는 줄 있는지 확인하고 없앨 수 있으면 없애기
  for (let i = GAME_ROWS - 1; i > 0; i--) {
    let cnt = 0;
    let breaks = [];
    for (let j = 0; j < GAME_COLS; j++) {
      if (playGround.children[i].children[j].classList.contains('seize')) {
        breaks.push(playGround.children[i].children[j]);
        cnt++;
      } else {
        break;
      }
    }
    if (cnt === GAME_COLS) {
      // 파괴
      breaks.forEach(item => (item.className = ''));
      // 밑으로 당기기
      for (let k = i; k > 0; k--) {
        for (let l = 0; l < GAME_COLS; l++) {
          playGround.children[k].children[l].className =
            playGround.children[k - 1].children[l].className;
        }
      }
    }
  }
};

const checkFinish = () => {
  let flag = false;
  for (let i = 0; i < GAME_COLS; i++) {
    if (playGround.children[0].children[i].classList.contains('seize')) {
      alert('게임종료');
      flag = true;
      break;
    }
  }

  return flag;
};

const clearTetris = () => {
  for (let i = 0; i < GAME_ROWS; i++) {
    for (let j = 0; j < GAME_COLS; j++) {
      playGround.children[i].children[j].className = '';
    }
  }
};

export const moveBlocks = (
  state,
  onLeft,
  onRight,
  onTop,
  onDir,
  initial,
  onStop,
) => {
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
        onStop();
        onTop();
        // 블럭 고정하기
        makeSeize(state);

        // 블럭 부수기
        breakBlocks();

        // 마지막줄에 블럭이 있으면 테트리스 지우고 다시 시작
        let finish = checkFinish();
        if (finish) {
          clearTetris();
          setTimeout(initial, 0);
        } else {
          // 새로운 블록 추가
          setTimeout(initial, 0);
        }
      default:
        break;
    }
  } else {
    removeCurrentBlocks(blockType);
    addNewBlocks(blockType, newBlocks);
  }
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

export const render = (
  state,
  onLeft,
  onRight,
  onTop,
  onDir,
  initial,
  onStop,
) => {
  moveBlocks(state, onLeft, onRight, onTop, onDir, initial, onStop);
};
