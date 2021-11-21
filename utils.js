import { playGround } from './dom.js';
import { GAME_ROWS, GAME_COLS } from './state.js';
import { blocks } from './blocks.js';

export const drawInitialTetris = () => {
  for (let i = 0; i < GAME_ROWS; i++) {
    const row = document.createElement('div');
    for (let j = 0; j < GAME_COLS; j++) {
      const col = document.createElement('span');
      row.appendChild(col);
    }
    playGround.appendChild(row);
  }
};

export const getLeft = state => {
  const block = blocks[state.type][state.dir];
  let arr = [];
  block.forEach(v => {
    arr.push(v[1]);
  });
  return Math.min(...arr) + state.left;
};

export const getTop = state => {
  const block = blocks[state.type][state.dir];
  let arr = [];
  block.forEach(v => {
    arr.push(v[0]);
  });
  return Math.min(...arr) + state.top;
};

export const getWidth = state => {
  const block = blocks[state.type][state.dir];
  let arr = [];
  block.forEach(v => {
    arr.push(v[1]);
  });
  return Math.max(...arr) - Math.min(...arr) + 1;
};

export const getHeight = state => {
  const block = blocks[state.type][state.dir];
  let arr = [];
  block.forEach(v => {
    arr.push(v[0]);
  });
  return Math.max(...arr) - Math.min(...arr) + 1;
};
