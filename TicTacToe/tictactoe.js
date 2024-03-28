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
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => board;

    const fillSquare = (squareNum, input) =>  {
        const [x, y] = squareNum.split('');
        console.log(`x: ${x}, y: ${y}`);

        board[x][y] = input;
    }

    function printBoard() {
        for (let row of board) {
            console.log(row.join(' | ')); // Join each element in the row with ' | '
            console.log('---------'); // Separator between rows
        }
    }

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
            } else if (win()) {
                
            }
        });
    }
    
    const gameOver = () => draw() || win();

    const draw = () => {
        const emptyCells = board.filter(row => 
            row.some(element => element === '')
        );

        // true if there's no empty rows i.e it's a draw
        return emptyCells.length === 0 ? true : false;
    }

    const win = () => {
        const checkHorizontalMatch = () => board.some(row => row.every(element => element === row[0] && row[0] !== ''));
        
        const checkVerticalMatch = () => {
            for (let i = 0; i < 3; i++) {
                const verticalLine = [];
                for (let y = 0; y < 3; y++) {
                    verticalLine.push(board[y][i]);
                }
                if (verticalLine.every(element => element === verticalLine[0] && verticalLine[0] !== '')) return true;
            }
            return false;
        }

        const checkCrossMatch = () => {
            const mainDiagonal = [];
            const antiDiagonal = [];

            for (let i = 0; i < 3; i++) {
                mainDiagonal.push(board[i][i]);
                antiDiagonal.push(board[i][2-i]);
            }

            const isMainDiagonalMatch = mainDiagonal.every(cell => cell === mainDiagonal[0] && cell !== '');
            const isAntiDiagonalMatch = antiDiagonal.every(cell => cell === antiDiagonal[0] && cell !== '');

            return isMainDiagonalMatch || isAntiDiagonalMatch;
        }

        return checkHorizontalMatch() || checkVerticalMatch() || checkCrossMatch();
    }


    // start of the game
    playRound();
})();