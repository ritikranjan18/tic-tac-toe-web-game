const board = document.getElementById("board");
const cells = [];
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

// Create the game board cells
for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", () => handleCellClick(i));
    cells.push(cell);
    board.appendChild(cell);
}

function handleCellClick(index) {
    if (gameBoard[index] === "" && !gameOver) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer === "X" ? "player-x" : "player-o");

        if (checkWin()) {
            gameOver = true;
            message.textContent = `${currentPlayer} wins!`;
        } else if (gameBoard.every((cell) => cell !== "")) {
            gameOver = true;
            message.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function resetBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("player-x", "player-o");
    });
    message.textContent = "";
}

resetButton.addEventListener("click", resetBoard);
