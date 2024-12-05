const board = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const boardSize = 20; 
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
let score = 0;

function drawBoard() {
    board.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            if (snake.some(segment => segment.x === j && segment.y === i)) {
                cell.classList.add('snake');
            } else if (food.x === j && food.y === i) {
                cell.classList.add('food');
            }
            board.appendChild(cell);
        }
    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Score : ${score}`;
        food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    } else {
        snake.pop();
    }

    // Vérifier les collisions
    if (
        head.x < 0 || head.x >= boardSize ||
        head.y < 0 || head.y >= boardSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        alert('Game Over ! Votre score : ' + score);
        resetGame();
    }
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = `Score : ${score}`;
    food = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
}

function changeDirection(event) {
    const { key } = event;
    if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
    if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
    if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
    if (key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    moveSnake();
    drawBoard();
}

resetGame();
setInterval(gameLoop, 200);
