/// <reference path="p5/p5.global-mode.d.ts" />

// Listen for keyboard events on window
window.addEventListener("keydown", function(event) {
    if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW || event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
        event.preventDefault(); // prevent default behavior of arrow keys (scrolling page)
        //isArrowKeyPressed = true;
    }
});

// variaveis
let xPos; // x inicial
let yPos; // y inicial
const canvasSize = 500;
var squareSize;

let isArrowKeyPressed = false; // variable to track whether an arrow key is currently being pressed
let arrowKeyTimer; // variable to store the interval timer when an arrow key is pressed


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
};

const level2 = { 
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
        x:4,
        y:5
    },
};

const level3 = { 
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
};

let board; //definir o board 1 como default
/**
 * Funcao para mudar o board
 * @argument nivel(int) - um numero de 1 ao total de niveis
 */
function playLevel(nivel){
    //selecionar nivel a partir ne um numero
    const levels = [level1,level2,level3];
    const level = levels[nivel-1];
    //mudar quadro e posicao inicial/final
    board = level.board;
    xPos = level.start.x; // x inicial
    yPos = level.start.y; // y inicial
    squareSize = canvasSize/board.length; // tamanho dos quadrados do tabuleiro
}

//o tabuleiro e iniciado com o nivel 1
playLevel(1);


function setup() {
    createCanvas(canvasSize,canvasSize).parent('canvas');
}

function draw() {
    background('brown');

    // Draw board
    stroke(0); // set stroke color to black
    strokeWeight(2); // set stroke weight to 2 pixels
    for (let i = 0; i < board.length; i++) { // loop through rows
        for (let j = 0; j < board.length; j++) { // loop through columns
                noStroke()
            if (board[i][j] === 1) { //casa percorrivel 2 vezes
                fill(100,10,20)
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            } else if (board[i][j] === -1) { //se a casa ja tiver sido percorrida
                fill(200,60,10);
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            } else if (board[i][j] === 2){
                fill(40,10,10);
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            }
        }
    }

    // Draw character
    fill(255, 33, 0); // set fill color to red
    rect(xPos*squareSize, yPos*squareSize, squareSize, squareSize); // draw a square at (xPos*squareSize, yPos*squareSize) with dimensions (squareSize, squareSize) 
    
}

// Handle arrow key input
function keyPressed() {
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
        console.log(board[yPos][xPos]);
        if (board[yPos][xPos] === 2){//se passar de uma casa caminhavel 2 vezes
            board[yPos][xPos]=1; //alterar o valor da posicao antiga no board para 1
        } else if (board[yPos][xPos] === 1){//se passar de uma casa caminhavel 1 vez
            board[yPos][xPos]=-1; //alterar o valor da posicao antiga no board para -1
        }
        xPos = newXPos; // update xPos
        yPos = newYPos; // update yPos
    }
    console.log(isArrowKeyPressed);
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

  
