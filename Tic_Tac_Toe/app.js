let cols = document.querySelectorAll(".col")
const statusDisplay = document.querySelector('.game--status');
let gameActive = true;
let scores = {
    "X": 0,
    "O": 0,
}
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
/*
We update our internal game state to reflect the played move, 
as well as update the user interface to reflect the played move
*/
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    //document.querySelector(".player.active"+current_player).classList.add("active");
}

function handlePlayerChange() {
   
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();

}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function UpdateScore(X,O){
    scores[current_player] += 1;
    document.querySelector('.player'+current_player+'_score').innerHTML = scores[current_player];
    document.querySelector('.result').innerHTML = "Player " + current_player +" win!";
    document.querySelector("#scoreboard #player1").innerHTML = "X";
    document.querySelector("#scoreboard #player2").innerHTML = "O";  
    updateScoreBoard(current_player) 
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
/*
If we get to here we know that the no one won the game yet, 
and that there are still moves to be played, so we continue by changing the current player.
*/
    handlePlayerChange();
    
}

var scoreboard = {"X": 0, "O":0};
function updateScoreBoard (winner) {
    if (++scoreboard[winner]==3) {
        setMessage("Game over! " + winner + " has won three matches");
    }
}
function handleCellClick(clickedCellEvent) {
/*
We will save the clicked html element in a variable for easier further use
*/    
    const clickedCell = clickedCellEvent.target;
/*
Here we will grab the 'id' attribute from the clicked cell to identify where that cell is in our grid. 
Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
integer(number)
*/
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('id')
    );
/* 
Next up we need to check whether the call has already been played, 
or if the game is paused. If either of those is true we will simply ignore the click.
*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
/* 
If everything if in order we will proceed with the game flow
*/    
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.col')
               .forEach(cell => cell.innerHTML = "");
    updateScore(document.currentPlayer);         
}

document.querySelectorAll('.col').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);




