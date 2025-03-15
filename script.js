const cells = document.querySelectorAll('.cell');
const winnerDisplay = document.getElementById('winner');
const bubblesContainer = document.getElementById('bubbles');
const player1LogoInput = document.getElementById('player1-logo');
const player2LogoInput = document.getElementById('player2-logo');
const startGameButton = document.getElementById('start-game');

let currentPlayer = 'X'; // Default starting player
let board = ['', '', '', '', '', '', '', '', ''];
let playerLogos = { player1: 'X', player2: 'O' }; // Default logos

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Start game with custom player logos
startGameButton.addEventListener('click', () => {
    const player1Logo = player1LogoInput.value.trim();
    const player2Logo = player2LogoInput.value.trim();

    if (player1Logo.length === 1 && player2Logo.length === 1) {
        playerLogos.player1 = player1Logo;
        playerLogos.player2 = player2Logo;
        alert(`Logos set! Player 1: ${player1Logo}, Player 2: ${player2Logo}`);
        resetGame(); // Reset the board to start fresh
    } else {
        alert('Please enter a single character for each player!');
    }
});

// Function to check the winner
function checkWinner() {
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes('') ? null : 'Draw';
}

// Create bubbles animation when a player wins
function createBubbles() {
    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.style.left = Math.random() * 100 + '%'; // Random horizontal position
        bubble.style.animationDelay = Math.random() * 2 + 's'; // Random start time
        bubble.style.width = bubble.style.height = Math.random() * 20 + 20 + 'px'; // Random size
        bubblesContainer.appendChild(bubble);

        // Remove bubble after animation
        bubble.addEventListener('animationend', () => {
            bubble.remove();
        });
    }
}

// Handle clicks on the game board cells
function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] || winnerDisplay.textContent) return; // Ignore if cell is already clicked or game is over

    board[index] = currentPlayer === 'X' ? playerLogos.player1 : playerLogos.player2;
    cell.textContent = board[index];

    const winner = checkWinner();
    if (winner) {
        winnerDisplay.textContent = winner === 'Draw' ? 'It\'s a Draw!' : `${winner} Wins!`;
        if (winner !== 'Draw') createBubbles(); // Show bubbles if there's a winner
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    }
}

// Reset the game board
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    winnerDisplay.textContent = '';
    currentPlayer = 'X'; // Reset to Player 1's turn
}

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
