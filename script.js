const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const vsPlayerButton = document.getElementById('vsPlayer');
const vsComputerButton = document.getElementById('vsComputer');
const gameContainer = document.getElementById('game-container');
const modeSelection = document.getElementById('mode-selection');
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let isVsComputer = false;

// Winning conditions
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    updateBoard(clickedCellIndex);
    updateUI(clickedCell);
    checkWin();

    if (isVsComputer && isGameActive) {
        setTimeout(computerMove, 500);
    }
}

// Update the board array
function updateBoard(index) {
    board[index] = currentPlayer;
}

// Update the UI for clicked cell
function updateUI(cell) {
    cell.textContent = currentPlayer;
}

// Check for a win or a draw
function checkWin() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const winCondition = winConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} wins!`);
        isGameActive = false;
        return;
    }

    if (!board.includes("")) {
        alert("It's a draw!");
        isGameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Computer makes a move (random empty cell)
function computerMove() {
    let emptyCells = board.map((value, index) => value === "" ? index : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
        updateBoard(randomIndex);
        updateUI(cell);
        checkWin();
    }
}

// Reset the game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => (cell.textContent = ""));
}

// Choose game mode
vsPlayerButton.addEventListener('click', () => {
    isVsComputer = false;
    modeSelection.style.display = 'none';
    gameContainer.style.display = 'block';
});

vsComputerButton.addEventListener('click', () => {
    isVsComputer = true;
    modeSelection.style.display = 'none';
    gameContainer.style.display = 'block';
});

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Reset button
resetButton.addEventListener('click', resetGame);
