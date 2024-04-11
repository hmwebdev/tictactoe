const gameboard = (function () {
  let board = ["", "", "", "", "", "", "", "", ""];
  return { board };
})();

function player(name, symbol) {
  return { name, symbol };
}

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

function newGame(name) {
  const discordName = "@" + name;
  return { name, discordName };
}
