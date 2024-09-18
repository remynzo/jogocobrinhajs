const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");

const audio = new Audio('/audio/audio.mp3');

const size = 30;

const initialPosition = { x: 270, y: 240 };

let snake = [initialPosition];
let isGameOver = false; // Variável de estado

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

let direction, loopId;

const drawFood = () => {
    const { x, y, color } = food;
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, size, size);
    ctx.shadowBlur = 0;
};

const drawSnake = () => {
    ctx.fillStyle = "#ddd";
    snake.forEach((position, index) => {
        if (index == snake.length - 1) {
            ctx.fillStyle = "white";
        }
        ctx.fillRect(position.x, position.y, size, size);
    });
};

const moveSnake = () => {
    if (!direction) return;
    
    const head = snake[snake.length - 1];

    let newHead;
    if (direction == "right") {
        newHead = { x: head.x + size, y: head.y };
    } else if (direction == "left") {
        newHead = { x: head.x - size, y: head.y };
    } else if (direction == "up") {
        newHead = { x: head.x, y: head.y - size };
    } else if (direction == "down") {
        newHead = { x: head.x, y: head.y + size };
    }

    snake.push(newHead);
    snake.shift();
};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for (let i = 30; i < canvas.width; i += size) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
};

const checkEat = () => {
    const head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {
        incrementScore();
        snake.push(head);
        audio.play();

        let x = randomPosition();
        let y = randomPosition();
        while (snake.find((position) => position.x == x && position.y == y)) {
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

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x == head.x && position.y == head.y;
    });

    if (wallCollision || selfCollision) {
        gameOver();
    }
};

const gameOver = () => {
    direction = undefined;
    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(2px)";
    clearTimeout(loopId); // Para o loop do jogo
    isGameOver = true;

    const jogadorNome = nome; // O nome que foi inserido pelo jogador
    const jogadorScore = score.innerText;
};

const gameLoop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    loopId = setTimeout(() => {
        gameLoop();
    }, 150);
};

document.addEventListener("keydown", ({ key }) => {
    if (isGameOver) return; // Ignora entradas de teclado se o jogo estiver terminado
    if (key == "ArrowRight" && direction != "left") {
        direction = "right";
    } else if (key == "ArrowLeft" && direction != "right") {
        direction = "left";
    } else if (key == "ArrowUp" && direction != "down") {
        direction = "up";
    } else if (key == "ArrowDown" && direction != "up") {
        direction = "down";
    }
});

buttonPlay.addEventListener("click", () => {
    snake = [initialPosition];
    direction = null; 
    clearTimeout(loopId); // Stop the game loop
    restart(); // Reinicializa o jogo e exibe a tela de inserção de nome
});

const restart = () => {
    score.innerText = "00";
    menu.style.display = "none";
    canvas.style.filter = "none";
    snake = [initialPosition];
    direction = null; 
    isGameOver = false; // Reinicializa o estado do jogo
    
    // Reinicializa o input de texto e exibe informações
    info.style.display = "flex";
    texto.value = ""; 
};
