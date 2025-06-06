const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

const size = canvas.width;
const rows = 3;
const cols = 3;
const cellSize = size / rows;

let currentPlayer = 'O'; // 最初は○から
let board = Array.from({ length: rows }, () => Array(cols).fill(null)); // マス状態

ctx.lineWidth = 2;
ctx.strokeStyle = '#333';

// マス目を描画
function drawGrid() {
  for (let i = 1; i < cols; i++) {
    const x = i * cellSize;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, size);
    ctx.stroke();
  }

  for (let i = 1; i < rows; i++) {
    const y = i * cellSize;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }
}

// 円（○）を描く
function drawCircle(row, col) {
  const centerX = col * cellSize + cellSize / 2;
  const centerY = row * cellSize + cellSize / 2;
  const radius = cellSize * 0.3;

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
}

// ×を描く
function drawCross(row, col) {
  const margin = cellSize * 0.2;
  const x1 = col * cellSize + margin;
  const y1 = row * cellSize + margin;
  const x2 = (col + 1) * cellSize - margin;
  const y2 = (row + 1) * cellSize - margin;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.moveTo(x2, y1);
  ctx.lineTo(x1, y2);
  ctx.stroke();
}

// クリック処理
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);

  // すでに描画済みなら無視
  if (board[row][col] !== null) return;

  if (currentPlayer === 'O') {
    drawCircle(row, col);
    board[row][col] = 'O';
    currentPlayer = 'X';
  } else {
    drawCross(row, col);
    board[row][col] = 'X';
    currentPlayer = 'O';
  }
});

// 初期描画
drawGrid();