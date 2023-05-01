/// <reference path="p5/p5.global-mode.d.ts" />

// Listen for keyboard events on window
window.addEventListener("keydown", function(event) {
    if (event.keyCode === LEFT_ARROW || event.keyCode === RIGHT_ARROW || event.keyCode === UP_ARROW || event.keyCode === DOWN_ARROW) {
        event.preventDefault(); // prevent default behavior of arrow keys (scrolling page)
    }
});

// variaveis
let xPos = 0; // x inicial
let yPos = 0; // y inicial
const squareSize = 40; // tamanho dos quadrados do tabuleiro
//let startTime; //usada para contar os milisegundos desde que uma seta foi carregada

let isArrowKeyPressed = false; // variable to track whether an arrow key is currently being pressed
let arrowKeyTimer; // variable to store the interval timer when an arrow key is pressed


 // array 2D (0=caminhavel, 1=bloqueado)
const level1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

let board = level1;

function setup() {
    createCanvas(400,400).parent('canvas');
}

function draw() {
    background('brown');

    // Draw board
    stroke(0); // set stroke color to black
    strokeWeight(2); // set stroke weight to 2 pixels
    for (let i = 0; i < 10; i++) { // loop through rows
        for (let j = 0; j < 10; j++) { // loop through columns
            if (board[i][j] === 0) {
                fill(100,10,20)
                noStroke()
                rect(j*squareSize, i*squareSize, squareSize, squareSize); // draw a square at (j*squareSize, i*squareSize) with dimensions (squareSize, squareSize)
            } else if (board[i][j] === 2) {
                fill(200,60,10);
                noStroke()
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
    if (newXPos >= 0 && newXPos < board[0].length && newYPos >= 0 && newYPos < board.length && board[newYPos][newXPos] === 0) {
        board[yPos][xPos]=2; //alterar o valor da posicao antinga no board para 2
        xPos = newXPos; // update xPos
        yPos = newYPos; // update yPos
    }
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        if (!isArrowKeyPressed) { // check if an arrow key is not currently being pressed
          isArrowKeyPressed = true;
          arrowKeyTimer = setInterval(keyPressed, 150); // call keyPressed() every 100 milliseconds while the key is still pressed
        }
      }
}

function keyReleased() {
    if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      clearInterval(arrowKeyTimer); // clear the interval timer when the arrow key is released
      isArrowKeyPressed = false; // set the isArrowKeyPressed variable to false
    }
  }
