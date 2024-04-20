const Gameboard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

const Game = (() => {
  const { board } = Gameboard;
  let symbol = "";
  let winner = "";
  let messageBox = document.getElementById("msg");

  const placeMarker = (el) => {
    const targetIndex = board[`${el.target.id}`];

    if (symbol === "") {
      symbol = player1.symbol;
      if (targetIndex === "") {
        board.splice(`${el.target.id}`, 1, symbol);
      }
    } else if (symbol === player1.symbol) {
      symbol = player2.symbol;
      winner = player2.name;
      if (targetIndex === "") {
        board.splice(`${el.target.id}`, 1, symbol);
      }
    } else if (symbol === player2.symbol) {
      symbol = player1.symbol;
      winner = player2.name;
      if (targetIndex === "") {
        board.splice(`${el.target.id}`, 1, symbol);
      }
    }

    putSymbol();
    checkWinner();
  };

  const putSymbol = () => {
    for (let i = 0; i < board.length; i++) {
      const box = document.getElementById(i);
      box.textContent = board[i];
    }
  };

  const lookEmptyField = (el) => {
    return el === "";
  };

  const checkWinner = () => {
    const positions = {
      X: [],
      O: [],
    };

    board.forEach((el, index) => {
      if (el === "X" || el === "O") {
        positions[el].push(index);
      }
    });

    const valuesToWin = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //let x = valuesToWin.every((position) => position.X.includes(position));
    function hasValues(array, values) {
      return values.every((value) => array.includes(value));
    }

    if (
      hasValues(positions.X, valuesToWin[0]) === true ||
      hasValues(positions.X, valuesToWin[1]) === true ||
      hasValues(positions.X, valuesToWin[2]) === true ||
      hasValues(positions.X, valuesToWin[3]) === true ||
      hasValues(positions.X, valuesToWin[4]) === true ||
      hasValues(positions.X, valuesToWin[5]) === true ||
      hasValues(positions.X, valuesToWin[6]) === true ||
      hasValues(positions.X, valuesToWin[7]) === true
    ) {
      winner = player1.name;
      messageBox.innerHTML = "The winner is " + winner;
    } else if (
      hasValues(positions.O, valuesToWin[0]) === true ||
      hasValues(positions.O, valuesToWin[1]) === true ||
      hasValues(positions.O, valuesToWin[2]) === true ||
      hasValues(positions.O, valuesToWin[3]) === true ||
      hasValues(positions.O, valuesToWin[4]) === true ||
      hasValues(positions.O, valuesToWin[5]) === true ||
      hasValues(positions.O, valuesToWin[6]) === true ||
      hasValues(positions.O, valuesToWin[7]) === true
    ) {
      winner = player2.name;
      messageBox.innerHTML = "The winner is " + winner;
    } else {
      if (board.find(lookEmptyField) === undefined) {
        messageBox.innerHTML = "Tied game";
      }
    }
  };

  const cases = Array.from(document.getElementsByClassName("box"));

  function addClick() {
    cases.forEach((box) => box.addEventListener("click", placeMarker));
  }

  function removeClick() {
    cases.forEach((box) => box.removeEventListener("click", placeMarker));
  }
  addClick();

  return {
    addClick,
    messageBox,
  };
})();

function player(name, symbol) {
  return { name, symbol };
}

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

const displayController = (function () {
  const { board } = Gameboard;
  const { messageBox } = Game;

  const resetBtn = document.getElementById("reset");

  resetBtn.addEventListener("click", () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
    location.reload();
  });
  messageBox.innerHTML = "May the best player win!";
})();
