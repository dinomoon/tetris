export const GAME_ROWS = 20;
export const GAME_COLS = 10;

export const initialState = {
  type: 'tree',
  dir: 0,
  left: 3,
  top: 0,
  keyType: null,
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
