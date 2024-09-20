const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const form = document.querySelector("form");
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");

const audio = new Audio('../audio/audio.mp3');
const size = 30;

const initialPosition = { x: 270, y: 240 };
let snake = [initialPosition];
let isGameOver = false; // Variável de estado
let direction, loopId;

const incrementScore = () => {
    score.innerText = +score.innerText + 10;
};

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / size) * size;
};

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
};

const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: randomColor()
};

const drawFood = () => {
    const { x, y, color } = food;
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
};

const drawSnake = () => {
    snake.forEach((position, index) => {
        ctx.fillStyle = index === snake.length - 1 ? "white" : "#ddd";
        ctx.fillRect(position.x, position.y, size, size);
    });
};

const moveSnake = () => {
    if (!direction) return;
    
    const head = snake[snake.length - 1];
    let newHead;

    switch (direction) {
        case "right":
            newHead = { x: head.x + size, y: head.y };
            break;
        case "left":
            newHead = { x: head.x - size, y: head.y };
            break;
        case "up":
            newHead = { x: head.x, y: head.y - size };
            break;
        case "down":
            newHead = { x: head.x, y: head.y + size };
            break;
    }

    snake.push(newHead);
    snake.shift();
};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for (let i = 30; i < canvas.width; i += size) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
};

const checkEat = () => {
    const head = snake[snake.length - 1];
    if (head.x === food.x && head.y === food.y) {
        incrementScore();
        snake.push(head); // Adiciona mais um bloco à cobra
        audio.play();

        let x = randomPosition();
        let y = randomPosition();
        while (snake.some(position => position.x === x && position.y === y)) {
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = randomColor();
    }
};

const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.some((position, index) => {
        return index < neckIndex && position.x === head.x && position.y === head.y;
    });

    if (wallCollision || selfCollision) {
        gameOver();
    }
};

const gameOver = () => {
    direction = undefined;
    document.querySelector("#score").value = score.innerText; 
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(20px) brightness(0.8)";
    clearTimeout(loopId); // Para o loop do jogo
    isGameOver = true;
};


const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    loopId = setTimeout(gameLoop, 150);
};

document.addEventListener("keydown", ({ key }) => {
    if (isGameOver) return; // Ignora entradas de teclado se o jogo estiver terminado
    if (key === "ArrowRight" && direction !== "left") direction = "right";
    else if (key === "ArrowLeft" && direction !== "right") direction = "left";
    else if (key === "ArrowUp" && direction !== "down") direction = "up";
    else if (key === "ArrowDown" && direction !== "up") direction = "down";
});

buttonPlay.addEventListener("click", () => {
    snake = [initialPosition];
    direction = null; 
    clearTimeout(loopId); // Para o loop atual do jogo
    restart(); // Reinicializa o jogo
});

const restart = () => {
    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";
    snake = [initialPosition];
    direction = null; 
    isGameOver = false; // Reinicializa o estado do jogo
    
    // Reinicializa o input de texto e exibe informações
    const info = document.querySelector(".info"); // Certifique-se de que o elemento existe
    if (info) info.style.display = "flex";
};
