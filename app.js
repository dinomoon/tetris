const playGround = document.querySelector('.playground');
const GAME_ROWS = 20;
const GAME_COLS = 10;

for (let i = 0; i < GAME_ROWS; i++) {
  const row = document.createElement('div');
  for (let j = 0; j < GAME_COLS; j++) {
    const col = document.createElement('span');
    row.appendChild(col);
  }
  playGround.appendChild(row);
}

const blocks = {
  square: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  tree: [
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [2, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [2, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  ],
};

const etc = {
  type: 'tree',
  dir: 0,
  left: 3,
  top: 0,
};

const draw = () => {
  console.log(etc);
  const { type, dir, left, top } = etc;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(block => block.classList.remove(type, 'moving'));
  blocks[type][dir].forEach(v => {
    const x = v[0] + top;
    const y = v[1] + left;
    // playGround.children[x]?.children[y]?.classList.add(type, 'moving');
    const a = playGround.children[x]?.children[y];
    if (!a) {
      playGround.children[x - top].children[y - left].classList.add(
        type,
        'moving',
      );
    } else {
      playGround.children[x].children[y].classList.add(type, 'moving');
    }
  });
};

draw();

document.body.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowLeft':
      etc.left--;
      draw();
      break;
    case 'ArrowRight':
      etc.left++;
      draw();
      break;
    case 'ArrowDown':
      etc.top++;
      draw();
      break;
    case 'ArrowUp':
      etc.dir = etc.dir === 3 ? 0 : ++etc.dir;
      draw();
      break;
    default:
      break;
  }
});
