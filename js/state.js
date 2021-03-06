export const GAME_ROWS = 20;
export const GAME_COLS = 10;
export const SINGLE_LINE_SCORE = 40;
export const DOUBLE_LINE_SCORE = 100;
export const TRIPLE_LINE_SCORE = 300;
export const NEXT_BLOCK_WINDOW_ROWS = 6;
export const NEXT_BLOCK_WINDOW_COLS = 6;

export const initialState = {
  type: null,
  nextBlockType: null,
  dir: null,
  nextBlockDir: null,
  left: 3,
  top: 0,
  keyType: null,
  intervalId: null,
  interval: 800,
  stop: false,
};

export const moveLeft = state => {
  return {
    ...state,
    left: --state.left,
    keyType: 'left',
  };
};

export const moveRight = state => {
  return {
    ...state,
    left: ++state.left,
    keyType: 'right',
  };
};

export const moveDown = state => {
  return {
    ...state,
    top: ++state.top,
    keyType: 'down',
  };
};

export const changeDir = state => {
  return {
    ...state,
    dir: state.dir === 3 ? 0 : ++state.dir,
    keyType: 'up',
  };
};
