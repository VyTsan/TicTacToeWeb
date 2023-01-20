var c;
let boxSize = 100;
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let w; // = width / 3;
let h; // = height / 3;
let r; // size of symbol

let players = ['X','O'];
let human = players[0];
let ai = players[1];
let currentPlayer = human;

let isGameEnded = false;
let winner = null;

let thinkTimeOut;
let isBotThinking = false;

function setup() {
  c = createCanvas(300, 300);
  c.parent("board");
  c.id('gameBoard');
  c.elt.style.display = 'block';
  c.elt.style.border = '8px solid #205295';
  c.elt.style.borderRadius = '12px';
  w = width / 3;
  h = height / 3;
  r = w / 5.5;
  resultEle.innerText = `Đến lượt bạn (${human})`;
}

function draw() {  
  background(255);
  drawBoard();
  hover();
  if (isGameEnded == true) {
    drawFinishLine();
    humiliateHuman();
    resBtnEle.classList.add('sexy');
    noLoop();
  }
}

function mouseClicked() {
  if (isGameEnded == false && currentPlayer == human) {
    if (mouseX>=0 && mouseX<=width && mouseY>=0 && mouseY<=height) {
      let i = floor(mouseX / boxSize);
      let j = floor(mouseY / boxSize); 
      // If valid turn
      if (i>=0 && i<3 && j>=0 && j<3) {
        if (board[i][j] == '') {
          board[i][j] = human;
          winner = checkWinner();
          if (winner != null) {
            isGameEnded = true;
          }
          if (isGameEnded == false) {
            currentPlayer = ai;
            resultEle.innerText = `Bot đang suy nghĩ... (${ai})`;
            isBotThinking = true;
            thinkTimeOut = setTimeout(() => {
              bestMove();
              winner = checkWinner();
              if (winner != null) {
                isGameEnded = true;
              }
              isBotThinking = false;
            }
            , 500);
          }
        }
      }
    }
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let tempWinner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      tempWinner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      tempWinner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    tempWinner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    tempWinner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }
  if (tempWinner == null && openSpots == 0) {
    return 'tie';
  } else {
    return tempWinner;
  }
}

function drawBoard() {
  stroke('#205295');
  fill(255);
  strokeWeight(2.5);
  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);
  strokeWeight(7);
  stroke(0);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      if (spot == players[1]) {
        noFill();
        ellipse(x, y, r * 2 + 5);
      } else if (spot == players[0]) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
}

function hover() {
  if (isBotThinking) {
    cursor(WAIT);
  } else if (isGameEnded == false) {
    if (mouseX>=0 && mouseX<=width && mouseY>=0 && mouseY<=height) {
      let i = floor(mouseX / boxSize);
      let j = floor(mouseY / boxSize);
      if (i>=0 && i<3 && j>=0 && j<3) {
        if (board[i][j] == '') {
          fill('#FFE15D');
          cursor('pointer');
        } else {
          noFill();
          cursor('default');
        }
        rectMode(CENTER);
        stroke('#205295');
        strokeWeight(5);
        rect(i*boxSize+boxSize/2,j*boxSize+boxSize/2,boxSize-4,boxSize-4);
      } 
    }
  } else {
    cursor('default');
  }
}

function drawFinishLine() {
  if (winner == 'tie') return;
  stroke(color(255,0,0,150));
  strokeWeight(9);
  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      line(i*boxSize+boxSize/2,boxSize/4,i*boxSize+boxSize/2,width-boxSize/4)
    }
  }

  // Horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      line(boxSize/4,i*boxSize+boxSize/2,width-boxSize/4,i*boxSize+boxSize/2);
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    line(boxSize/4,boxSize/4,width-boxSize/4,height-boxSize/4);
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    line(width-boxSize/4,boxSize/4,boxSize/4,height-boxSize/4);
  }
}