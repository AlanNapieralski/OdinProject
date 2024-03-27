const readline = require('readline');

const input = {
    x: "X",
    o: "O"
};

function createPlayer (playerNumber) {
    const playerName = "Player " + playerNumber;
    let playerInput = "";

    switch (playerNumber) {
        case 1:
            playerInput = input.x;
            break;
        case 2:
            playerInput = input.o;
            break;
    }

    const getInput = () => playerInput;

    return {playerName, getInput}; 
};

const gameboard = (function () {
    let board = Array(9).fill(""); // Initialize the board with empty strings

    const getBoard = () => board;

    const fillSquare = (squareNum, input) => board[squareNum] = input;

    const printBoard = () => {
        for (let i = 0; i < 9; i += 3) {
            console.log(board.slice(i, i + 3).join(' | '));
            if (i < 6) console.log('---------');
        }
    };

    return { getBoard, fillSquare, printBoard };
})();

const game = (function () {
    const board = gameboard.getBoard();
    

    const players = [
        playerOne = createPlayer(1),
        playerTwo = createPlayer(2)
    ];
    
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const playRound = () => {
        gameboard.printBoard();

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
          });
          
          rl.question('Please enter something: ', (answer) => {
            gameboard.fillSquare(answer, activePlayer.getInput());
            
            gameboard.printBoard();
            rl.close();

            if (!gameOver()) {
                switchPlayerTurn();
                playRound();
            } else {
                console.log("Game Over! Draw")
            }
        });
    }

    const gameOver = () => {
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") return false;
        }
        return true;
    }


    // start of the game
    playRound();
})();