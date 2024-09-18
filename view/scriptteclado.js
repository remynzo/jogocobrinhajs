const teclado = document.getElementById('teclado');
const texto = document.getElementById('texto');
const info = document.querySelector(".info")

// Array com as letras do teclado, divididas em linhas para melhor organização
const letras = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '<'],
    ['Enviar'] // Nova fileira com uma tecla que ocupa toda a largura
];
let nome
// Variáveis para controlar a posição da tecla selecionada
let linhaSelecionada = 0;
let colunaSelecionada = 0;

// Função para criar as divs das teclas
function criarTeclado() {  
    letras.forEach((linha) => {
        const divLinha = document.createElement('div');
        divLinha.classList.add('linha-teclado');
        
        linha.forEach((letra) => {
            const tecla = document.createElement('div');
            tecla.classList.add('tecla');
            if (letra === 'Enviar') {
                tecla.classList.add('tecla-enviar'); // Classe especial para a tecla "Enviar"
            }
            tecla.textContent = letra;
            divLinha.appendChild(tecla);
        });
        
        teclado.appendChild(divLinha);
    });

    // Seleciona a primeira tecla por padrão
    selecionarTecla(0, 0);
}

// Função para selecionar uma tecla específica
function selecionarTecla(linha, coluna) {
    const teclas = document.querySelectorAll('.tecla');
    teclas.forEach(tecla => tecla.classList.remove('selecionada'));

    let indice = 0;
    for (let i = 0; i < linha; i++) {
        indice += letras[i].length;
    }
    indice += coluna;

    const teclaSelecionada = teclas[indice];
    teclaSelecionada.classList.add('selecionada');
}

// Função para mover a seleção para a próxima tecla
function moverSelecao(direcao) {
    switch (direcao) {
        case 'esquerda':
            if (colunaSelecionada > 0) {
                colunaSelecionada--;
            }
            break;
        case 'direita':
            if (colunaSelecionada < letras[linhaSelecionada].length - 1) {
                colunaSelecionada++;
            }
            break;
        case 'cima':
            if (linhaSelecionada > 0) {
                linhaSelecionada--;
                colunaSelecionada = Math.min(colunaSelecionada, letras[linhaSelecionada].length - 1);
            }
            break;
        case 'baixo':
            if (linhaSelecionada < letras.length - 1) {
                linhaSelecionada++;
                colunaSelecionada = Math.min(colunaSelecionada, letras[linhaSelecionada].length - 1);
            }
            break;
    }
    selecionarTecla(linhaSelecionada, colunaSelecionada);
}

// Função para inserir o caractere da tecla pressionada
function inserirCaractere() {
    const teclas = document.querySelectorAll('.tecla');
    let indice = 0;
    for (let i = 0; i < linhaSelecionada; i++) {
        indice += letras[i].length;
    }
    indice += colunaSelecionada;

    const tecla = teclas[indice];
    const caractere = tecla.textContent;

    if (caractere === '<') {
        texto.value = texto.value.slice(0, -1);
    } else if (caractere === 'Enviar') {
        // Lógica para a tecla "Enviar"
        nome = texto.value
        info.style.display="none"
        isGameOver = false; // Reinicializa o estado do jogo
        gameLoop()
        // Você pode adicionar outras ações específicas para o botão "Enviar" aqui
    } else {
        texto.value += caractere;
    }
}

// Eventos para controlar a navegação e a seleção
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            moverSelecao('esquerda');
            break;
        case 'ArrowRight':
            moverSelecao('direita');
            break;
        case 'ArrowUp':
            moverSelecao('cima');
            break;
        case 'ArrowDown':
            moverSelecao('baixo');
            break;
        case 'Enter':
            inserirCaractere();
            break;
    }
});

criarTeclado();
