/// <reference path="p5/p5.global-mode.d.ts" />

// Listen for keyboard events on window
window.addEventListener("keydown", function(event) {
    if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW || event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
        event.preventDefault(); // prevent default behavior of arrow keys (scrolling page)
    }
});

// variaveis
let xPos; // x inicial
let yPos; // y inicial
const canvasSize = 500;
var squareSize;
let endPos;

let isArrowKeyPressed = false; // variable to track whether an arrow key is currently being pressed
let arrowKeyTimer; // variable to store the interval timer when an arrow key is pressed
let isButtonPressed = false;
let buttonTimer;

// array 2D (0=bloqueado, 1=caminhavel, 2=caminhavel 2 vezes)
const level1 = {
    board: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    start: {
        x:0,
        y:0
    },
    finish: {
        x:5,
        y:5
    },
    total: 58
};
const level2 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:0,
        y:6
    },
    finish: {
        x:12,
        y:3
    },
    total: 19
};
const level3 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:12,
        y:5
    },
    finish: {
        x:0,
        y:8
    },
    total: 41
}
const level4 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:1,
        y:9
    },
    finish: {
        x:12,
        y:9
    },
    total: 43
};
const level5 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:12,
        y:7
    },
    finish: {
        x:4,
        y:5
    },
    total: 66
};
const level6 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:5,
        y:4
    },
    finish: {
        x:13,
        y:6
    },
    total: 82
}
const level7 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1],
        [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
        [1, 2, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
        [1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0],
        [1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:12,
        y:9
    },
    finish: {
        x:7,
        y:7
    },
    total: 99
}
const level8 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 1, 1, 0, 1, 1, 1, 2, 1, 1, 2, 2, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0],
        [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0],
        [0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0],
        [2, 0, 1, 0, 1, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
        [2, 0, 1, 2, 1, 0, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1],
        [2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 1, 1],
        [2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:14,
        y:13
    },
    finish: {
        x:6,
        y:13
    },
    total: 128
};
const level9 = {
    board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 2, 2, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 2, 2, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 0, 1],
        [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 0, 0, 2, 2, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    start: {
        x:8,
        y:6
    },
    finish: {
        x:14,
        y:12
    },
    total: 204
}
const levels = [level1,level2,level3,level4,level5,level6,level7,level8,level9];

let board; //definir o board 1 como default
let nivel = 1; //começar no nivel 1
let pontos = [0,0];
let highscores = JSON.parse(localStorage.getItem('highscores')); //lista com os recordes de pontos por nível
if (highscores==null){
    highscores = []
    highscores.length = 9;
    localStorage.setItem('highscores', JSON.stringify(highscores));
}
/**
 * Função que apresenta a pontuação
 * @param {number} n A pontuação após cada movimento
 * @param {number} p A pontuação total
 */
function updatePontos(n,p) {
    //botao de recomeçar
    let button = "<p onclick=\"playLevel(" + nivel + ")\" id=\"b\">Recomeçar<p>";
    //record
    let record = highscores[nivel-1];
    if (record==null){
        record = 0;
    }
    //total do nivel
    if (p==undefined){
        pontos[0] = n;
        document.getElementById('pontos').innerHTML = button + "<p> Nível: " + nivel + " Pts: " + n + " Record: " + record + "  Total: " + pontos[1] + "</p>";
    } else {
        pontos = [n,p];
        document.getElementById('pontos').innerHTML = button + "<p> Nível: " + nivel + " Pts: " + n + " Record: " + record + " Total: " + p + "</p>";
    }
}
/**
 * Funcao para mudar o board
 * @argument nivel(int) - um numero de 1 ao total de niveis
 */
function playLevel(n){
    nivel = n; //guardar o nivel onde o jogador esta
    //selecionar nivel a partir de um numero
    const level = levels[n-1];
    updatePontos(0,level.total);
    board = JSON.parse(JSON.stringify(level.board));  // mudar quadro
    xPos = level.start.x; // x inicial
    yPos = level.start.y; // y inicial
    endPos = { x:level.finish.x, y:level.finish.y};
    squareSize = canvasSize/board.length; // tamanho dos quadrados do tabuleiro
}

//o tabuleiro e iniciado com o nivel 1
playLevel(1);

function setup() {
    createCanvas(canvasSize,canvasSize).parent('canvas');
}

function draw() {
    background('brown');
    noStroke();
    // Draw board
    for (let i = 0; i < board.length; i++) { // loop through rows
        for (let j = 0; j < board.length; j++) { // loop through columns
            if (board[i][j] === 1) { //casa percorrivel 2 vezes
                fill(100,10,20)
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            } else if (board[i][j] === -1) { //se a casa ja tiver sido percorrida
                fill(200,60,10);
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            } else if (board[i][j] === 2){ //se a casa for caminhável 2 vezes
                fill(60,10,10);
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            }
        }
    }
    // desenhar o ponto de chegada
    fill(40,0,0);
    rect(endPos.x*squareSize, endPos.y*squareSize, squareSize, squareSize);

    // Draw character
    fill(255, 33, 0); // set fill color to red
    rect(xPos*squareSize, yPos*squareSize, squareSize, squareSize); // draw a square at (xPos*squareSize, yPos*squareSize) with dimensions (squareSize, squareSize) 
    
}

// Handle arrow key input
function keyPressed() {
    move(keyCode);
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        if (!isArrowKeyPressed) { // check if an arrow key is not currently being pressed
          isArrowKeyPressed = true;
          arrowKeyTimer = setInterval(keyPressed, 200); // call keyPressed() every 200 milliseconds while the key is still pressed
        }
    }
}

function keyReleased() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        clearInterval(arrowKeyTimer); // clear the interval timer when the arrow key is released
        isArrowKeyPressed = false; // set the isArrowKeyPressed variable to false
    }
}

let buttonDirection;
function buttonPressed(keyCode){
    move(keyCode)
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        buttonDirection = keyCode;
        if (!isButtonPressed) {
            isButtonPressed = true;
            buttonTimer = setInterval(moveWithButton, 200); // call keyPressed() every 200 milliseconds while the key is still pressed
        }
    }
}

function buttonReleased(){
    clearInterval(buttonTimer); // clear the interval timer when the arrow key is released
    isButtonPressed = false; // set the isArrowKeyPressed variable to false
    buttonDirection = null;
}

function moveWithButton(){
    move(buttonDirection);
}

//funcao que guarda a direcao guardada


/**
 * Função que move o jogador no tabuleiro.
 * Chamada quando se carrega num dos botões ou teclas de setas
 * @param {*} keyCode Direção do movimento.
 */
function move(keyCode){
    let newXPos = xPos; // initialize newXPos to current xPos
    let newYPos = yPos; // initialize newYPos to current yPos
    if (keyCode === UP_ARROW) { // if up arrow is pressed
        newYPos--; // move up one row
    } else if (keyCode === DOWN_ARROW) { // if down arrow is pressed
        newYPos++; // move down one row
    } else if (keyCode === LEFT_ARROW) { // if left arrow is pressed
        newXPos--; // move left one column
    } else if (keyCode === RIGHT_ARROW) { // if right arrow is pressed
        newXPos++; // move right one column
    }
    // Check if new position is within bounds and unblocked
    if (newXPos >= 0 && newXPos < board[0].length && newYPos >= 0 && newYPos < board.length && board[newYPos][newXPos] > 0) {
        if (board[yPos][xPos] === 2){//se passar de uma casa caminhavel 2 vezes
            board[yPos][xPos]=1; //alterar o valor da posicao antiga no board para 1
        } else if (board[yPos][xPos] === 1){//se passar de uma casa caminhavel 1 vez
            board[yPos][xPos]=-1; //alterar o valor da posicao antiga no board para -1
        }
        xPos = newXPos; // update xPos
        yPos = newYPos; // update yPos
        updatePontos(pontos[0]+1); //adicionar 1 ponto
    }
    // se a nova posição for a final
    if (newXPos == endPos.x && newYPos == endPos.y){
        highscores = JSON.parse(localStorage.getItem('highscores'));
        //se nao houver higscore para este nivel
        //ou o highscore que esta guardado seja menor do que o obtido
        if (highscores[nivel-1] == null || pontos[0] > highscores[nivel-1]) {
            //guardar o highscore
            highscores[nivel-1] = pontos[0];
            localStorage.setItem('highscores', JSON.stringify(highscores));
        }
        //verificar por troféus
        awardCheck(highscores);
        //passar para o próximo nivel
        nivel++
        playLevel(nivel);
    }
}

function awardCheck(highscores){
    let soma = highscores.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    console.log(highscores);
    console.log(soma);
    //min:179
    //max:720
}