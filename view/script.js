const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const form = document.querySelector("form");
const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");
const botao = document.querySelector('#chamaPHP'); 

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

const randomPosition = (axis) => {
    const maxSize = axis === 'x' ? canvas.width : canvas.height;
    const number = randomNumber(0, maxSize - size);
    return Math.round(number / size) * size;
};

const randomColor = () => {
    const red = randomNumber(0, 255);
    const green = randomNumber(0, 255);
    const blue = randomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
};

const food = {
    x: randomPosition('x'),
    y: randomPosition('y'),
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
        if (index === snake.length - 1) {
            // Configurar estilo da cabeça da cobra
            ctx.fillStyle = "#3d8b54";
            ctx.fillRect(position.x, position.y, size, size);

            // Configurações para desenhar olhos e língua com base na direção
            let olho1, olho2, lingua;

            if (direction === "right") {
                // Olhos para a direita
                olho1 = { x: position.x + size * 0.7, y: position.y + size * 0.2 };
                olho2 = { x: position.x + size * 0.7, y: position.y + size * 0.6 };
                // Língua para a direita
                lingua = { x: position.x + size, y: position.y + size / 2 - 2, width: size / 2, height: 4 };
            } else if (direction === "left") {
                // Olhos para a esquerda
                olho1 = { x: position.x + size * 0.1, y: position.y + size * 0.2 };
                olho2 = { x: position.x + size * 0.1, y: position.y + size * 0.6 };
                // Língua para a esquerda
                lingua = { x: position.x - size / 2, y: position.y + size / 2 - 2, width: size / 2, height: 4 };
            } else if (direction === "down") {
                // Olhos para baixo
                olho1 = { x: position.x + size * 0.2, y: position.y + size * 0.7 };
                olho2 = { x: position.x + size * 0.6, y: position.y + size * 0.7 };
                // Língua para baixo
                lingua = { x: position.x + size / 2 - 2, y: position.y + size, width: 4, height: size / 2 };
            } else if (direction === "up") {
                // Olhos para cima
                olho1 = { x: position.x + size * 0.2, y: position.y + size * 0.1 };
                olho2 = { x: position.x + size * 0.6, y: position.y + size * 0.1 };
                // Língua para cima
                lingua = { x: position.x + size / 2 - 2, y: position.y - size / 2, width: 4, height: size / 2 };
            } else {
                // Default para quando o jogo começa
                olho1 = { x: position.x + size * 0.2, y: position.y + size * 0.2 };
                olho2 = { x: position.x + size * 0.6, y: position.y + size * 0.2 };
                lingua = { x: position.x + size / 2 - 2, y: position.y - size / 2, width: 4, height: size / 2 };
            }

            // Desenhar olhos
            ctx.fillStyle = "black";
            ctx.fillRect(olho1.x, olho1.y, size * 0.2, size * 0.2);
            ctx.fillRect(olho2.x, olho2.y, size * 0.2, size * 0.2);

            // Desenhar a língua
            ctx.fillStyle = "red";
            ctx.fillRect(lingua.x, lingua.y, lingua.width, lingua.height);

        } else {
            ctx.fillStyle = "#56a16d"; // Cor do corpo da cobra
            ctx.fillRect(position.x, position.y, size, size);
        }
    });
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]

    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })
    }

    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })
    }

    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })
    }

    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })
    }

    snake.shift()
}

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

        let x = randomPosition('x');
        let y = randomPosition('y');
        while (snake.some(position => position.x === x && position.y === y)) {
            x = randomPosition('x');
            y = randomPosition('y');
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
    let pontos = score.innerText; 
    document.getElementById('score').value = pontos;
    direction = null;
    isGameOver = true;
    botao.click();
    botao.disabled = true; // Desabilita o botão de envio
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

gameLoop();
