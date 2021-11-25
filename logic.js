let players = ['x', 'o'];
let activePlayer = 1;
let board;
let countCross = 0;
let countZero = 0;

function startGame() { 
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let input = prompt('Кто ходит первым?\nКрестик - нажмите 1, Нолик - нажмите 2');
  
  if (input === '2') {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  renderBoard(board);
}

function changePlayer(x) {
  if (x === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  return activePlayer;
};

function testDraw(board) {
  let testDraw = 0;
  
  for (let i = 0; i < board.length; i++) {
    for (let c = 0; c < board[i].length; c++) {
      if (board[i][c] === ''){
        testDraw++;
      }
    }
  }

  if (testDraw === 0) {
    showWinner('Ничья');
  }
}

function checkWin(checkArray, activePlayer) {
  let count = 0;
  if (typeof(checkArray[0]) === 'object') {
    for (let i = 0; i < checkArray.length; i++) {
      let x = new Set(checkArray[i]).size == 1;
      if ((checkArray[i].indexOf('') == -1) && (x === true)) {
        showWinner(activePlayer + 1);
      } else if ((checkArray[i].indexOf('') == -1) && (x === false)) {
        count++;
      }
    }
  } else {
      x = new Set(checkArray).size == 1;
      if ((checkArray.indexOf('') == -1) && (x === true)) {
        showWinner(activePlayer + 1);
      } else if ((checkArray.indexOf('') == -1) && (x === false)) {
        count++;
      }
    }  
  if (count === checkArray.length) {
    testDraw(board);
  }
}

function checkHorizontal(board) {
  checkWin(board, activePlayer);
}

function checkVertical(board) {
  let c = 0
  let newBoard = [];

  while (c < 3) {
    let arr = [];

    for (let i = 0; i < board.length; i++) {
      arr.push(board[i][c]);
    }
    newBoard.push(arr);
    c++;
  }
  checkWin(newBoard, activePlayer);
}

function checkDiagonalLeft(board) {
  let c = 0;
  let newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard.push(board[i][c]);
    c++;
  }
  checkWin(newBoard, activePlayer);
}

function checkDiagonalRight(board) {
  let c = (board.length - 1);
  let newBoard = [];
  for (let i = 0; i < board.length; i++) {
    newBoard.push(board[i][c]);
    c--;
  } 
  checkWin(newBoard, activePlayer);
}

function click(stringNum, colunmNum) {
  board[stringNum][colunmNum] = (players[activePlayer]);
  renderBoard(board);
  
  if (activePlayer === 1) {
    countCross++;
  } else if (activePlayer === 0) {
    countZero++;
  }
  
  if ((countCross >= board.length) || (countZero >= board.length)) {
    checkHorizontal(board);

    checkVertical(board);

    checkDiagonalLeft(board);

    checkDiagonalRight(board);
  }
  changePlayer(activePlayer);
}
  


