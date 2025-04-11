import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBN07ubU0AijfsVG2aJP38rzlRnSMJQNjU",
  authDomain: "parcial-e02ad.firebaseapp.com",
  projectId: "parcial-e02ad",
  storageBucket: "parcial-e02ad.firebasestorage.app",
  messagingSenderId: "612576348278",
  appId: "1:612576348278:web:3b620d1800de1ad2fef757"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Variables del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
let snake = [{ x: 2, y: 2 }];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScore = 0;
let gameInterval;

canvas.width = 400;
canvas.height = 400;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dibujar serpiente
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  // Dibujar comida
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  scoreElement.textContent = score;
  highScoreElement.textContent = highScore;
}

function update() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  // Colisión con bordes
  if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
    return endGame();
  }

  // Colisión con cuerpo
  if (snake.some((seg, i) => i !== 0 && seg.x === head.x && seg.y === head.y)) {
    return endGame();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
    updateHighScore();
  } else {
    snake.pop();
  }

  draw();
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize));
  food.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

function endGame() {
  clearInterval(gameInterval);
  alert(`Juego terminado. Tu puntuación fue ${score}`);
  saveHighScore();
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
  }
}

function saveHighScore() {
  const refHigh = ref(database, 'highScore');
  set(refHigh, highScore);
}

function loadHighScore() {
  const refHigh = ref(database, 'highScore');
  get(refHigh).then(snapshot => {
    if (snapshot.exists()) {
      highScore = snapshot.val();
      highScoreElement.textContent = highScore;
    }
  });
}

function resetGame() {
  snake = [{ x: 2, y: 2 }];
  direction = { x: 1, y: 0 };
  food = { x: 5, y: 5 };
  score = 0;
  scoreElement.textContent = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(update, 120);
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

restartBtn.addEventListener('click', resetGame);

// Iniciar juego
loadHighScore();
resetGame();


// Variables del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const restartBtn = document.getElementById('restartBtn');

const gridSize = 20;
let snake = [{ x: 2, y: 2 }];
let direction = { x: 1, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let highScore = 0;
let gameInterval;

canvas.width = 400;
canvas.height = 400;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'lime';
  snake.forEach(segment => {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  });

  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

  scoreElement.textContent = score;
  highScoreElement.textContent = highScore;
}

function update() {
  const head = { ...snake[0] };
  head.x += direction.x;
  head.y += direction.y;

  if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
    return endGame();
  }

  if (snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
    return endGame();
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood();
    updateHighScore();
  } else {
    snake.pop();
  }

  draw();
}

function spawnFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize));
  food.y = Math.floor(Math.random() * (canvas.height / gridSize));
}

function endGame() {
  clearInterval(gameInterval);
  alert(`Juego terminado. Tu puntuación fue ${score}`);
  saveHighScore();
}

function saveHighScore() {
  const ref = database.ref('highScore');
  ref.set(highScore);
}

function loadHighScore() {
  const ref = database.ref('highScore');
  ref.once('value').then(snapshot => {
    if (snapshot.exists()) {
      highScore = snapshot.val();
      highScoreElement.textContent = highScore;
    }
  });
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    highScoreElement.textContent = highScore;
  }
}

function resetGame() {
  snake = [{ x: 2, y: 2 }];
  direction = { x: 1, y: 0 };
  food = { x: 5, y: 5 };
  score = 0;
  scoreElement.textContent = score;
  clearInterval(gameInterval);
  gameInterval = setInterval(update, 120);
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
  if (!touchStartX || !touchStartY) return;

  const deltaX = e.touches[0].clientX - touchStartX;
  const deltaY = e.touches[0].clientY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0 && direction.x === 0) direction = { x: 1, y: 0 };
    else if (deltaX < 0 && direction.x === 0) direction = { x: -1, y: 0 };
  } else {
    if (deltaY > 0 && direction.y === 0) direction = { x: 0, y: 1 };
    else if (deltaY < 0 && direction.y === 0) direction = { x: 0, y: -1 };
  }

  touchStartX = 0;
  touchStartY = 0;
});

restartBtn.addEventListener('click', resetGame);

loadHighScore();
resetGame();
