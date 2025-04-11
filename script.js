const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const tileSize = 20;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

let pacman = { x: 5, y: 5 };
let direction = "right";
let dots = [];

function initDots() {
  dots = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (!(i === pacman.x && j === pacman.y)) {
        dots.push({ x: i, y: j });
      }
    }
  }
}

function drawPacman() {
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(
    pacman.x * tileSize + tileSize / 2,
    pacman.y * tileSize + tileSize / 2,
    tileSize / 2,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(pacman.x * tileSize + tileSize / 2, pacman.y * tileSize + tileSize / 2);
  ctx.fill();
}

function drawDots() {
  ctx.fillStyle = "white";
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(
      dot.x * tileSize + tileSize / 2,
      dot.y * tileSize + tileSize / 2,
      3,
      0,
      2 * Math.PI
    );
    ctx.fill();
  });
}

function update() {
  if (direction === "up") pacman.y--;
  if (direction === "down") pacman.y++;
  if (direction === "left") pacman.x--;
  if (direction === "right") pacman.x++;

  // Teleport through walls
  if (pacman.x < 0) pacman.x = cols - 1;
  if (pacman.x >= cols) pacman.x = 0;
  if (pacman.y < 0) pacman.y = rows - 1;
  if (pacman.y >= rows) pacman.y = 0;

  // Eat dots
  dots = dots.filter(dot => !(dot.x === pacman.x && dot.y === pacman.y));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDots();
  drawPacman();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function setDirection(dir) {
  direction = dir;
}

// Keyboard controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") setDirection("up");
  if (e.key === "ArrowDown") setDirection("down");
  if (e.key === "ArrowLeft") setDirection("left");
  if (e.key === "ArrowRight") setDirection("right");
});

initDots();
gameLoop();
