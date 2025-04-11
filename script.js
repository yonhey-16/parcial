const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const tileSize = 20;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

let snake = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = "right";
let score = 0;

function drawSquare(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar comida
  drawSquare(food.x, food.y, "red");

  // Dibujar snake
  snake.forEach((segment, index) => {
    drawSquare(segment.x, segment.y, index === 0 ? "#0f0" : "#3f3");
  });
}

function update() {
  const head = { ...snake[0] };

  if (direction === "up") head.y--;
  if (direction === "down") head.y++;
  if (direction === "left") head.x--;
  if (direction === "right") head.x++;

  // Colisión con paredes
  if (
    head.x < 0 || head.x >= cols ||
    head.y < 0 || head.y >= rows ||
    snake.some(seg => seg.x === head.x && seg.y === head.y)
  ) {
    alert("¡Perdiste! Puntaje: " + score);
    snake = [{ x: 5, y: 5 }];
    food = { x: 10, y: 10 };
    score = 0;
    updateScore();
    return;
  }

  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    updateScore();
    placeFood();
  } else {
    snake.pop();
  }
}

function updateScore() {
  document.getElementById("score").textContent = "Puntaje: " + score;
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

function gameLoop() {
  update();
  draw();
  setTimeout(gameLoop, 150); // Velocidad
}

function setDirection(dir) {
  const opposites = {
    up: "down",
    down: "up",
    left: "right",
    right: "left"
  };
  if (dir !== opposites[direction]) {
    direction = dir;
  }
}

// Controles con teclado
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") setDirection("up");
  if (e.key === "ArrowDown") setDirection("down");
  if (e.key === "ArrowLeft") setDirection("left");
  if (e.key === "ArrowRight") setDirection("right");
});

gameLoop();
