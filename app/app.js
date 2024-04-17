const Gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

function player(name, symbol) {
  return { name, symbol };
}

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

const Game = (function () {
  const { board } = Gameboard.board;
  let symbol = "";
  let winner = "";

  const placeMarker = (el) => {
    // Push
    const targetIndex = board[`${el.target.id}`];
    console.log(el.target); //sets the board square to the corrosponding array index

    if (symbol === "") {
      symbol = player1.symbol;
      console.log(symbol);
      if (targetIndex === "") {
        board.splice(`${el.target.id}`, 1, symbol);
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
    }
  };

  displayController;

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
  };
})();

const displayController = (function () {
  const { board } = Gameboard;
  const { addClick } = Game;

  function putSymbol() {
    for (let i = 0; i < board.length; i++) {
      const box = document.getElementById(i);
      box.textContent = board[i];
    }
  }

  const resetBtn = document.getElementById("reset");

  resetBtn.addEventListener("click", () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  });
})();
