const input = {
    x: "x",
    o: "o"
};

const gameboard = (function () {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => board;

    const resetBoard = () => board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const fillSquare = (cellIndex, input) =>  {
        const {x, y} = cellIndex;
        board[x][y] = input;
    }

    return { getBoard, resetBoard, fillSquare };
})();

const game = (function () {
    // DOM interaction
    const btns = document.getElementsByClassName('square');
    const text = document.querySelector('h1');

    const rows = 3;
    const cols = 3;
    const btns2D = convertTo2DArray(btns, rows, cols);

    // game
    let board = gameboard.getBoard();
    let drawCount = 0;
    
    const players = [
        playerOne = createPlayer(1),
        playerTwo = createPlayer(2)
    ];

    const paragraph = document.getElementsByTagName("p");

    const updateScoreboard = () => {
            paragraph[0].innerText = `${players[0].getName()}'s wins: ${players[0].getCount()}`;
            paragraph[2].innerText = `${players[1].getName()}'s wins: ${players[1].getCount()}`;
            paragraph[1].innerText = `Draws: ${drawCount}`;
    };
    updateScoreboard();
    

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    // action listener
    for (let x = 0; x < btns2D.length; x++) {
        for (let y = 0; y < btns2D[x].length; y++) {
            const button = btns2D[x][y];
            button.addEventListener('click', function () {
                if (board[x][y] === '') {
                    const cell = button.querySelector('div');
                    cell.classList.add(activePlayer.getInput());
                    playRound({x, y});
                }
            });
        }
    }

    const restart = () => {
        gameboard.resetBoard();

        board = gameboard.getBoard();

        for (let btn of btns) {
            const cell = btn.querySelector('div');
            cell.className = "nothing";
        }

        activePlayer = players[0];
    }

    const playRound = (indexes) => {

        gameboard.fillSquare(indexes, activePlayer.getInput());

        const {isWon, winner} = win();

        if (!(draw() || isWon)) {
            switchPlayerTurn();
            text.innerText = `${activePlayer.getName()}'s turn 🤔`;
        } else if (isWon) {
            text.innerText = `${winner.getName()} have won 😎`;
            winner.incrementCount();
            restart();
            updateScoreboard();
        } else if (draw()) {
            text.innerText = `Draw 🙀`;
            restart();
            drawCount++;
            updateScoreboard();
        }
    }
    
    // win conditions

    const draw = () => {
        const emptyCells = board.filter(row =>
            row.some(element => element === '')
        );

        // true if there's no empty rows i.e it's a draw
        return emptyCells.length === 0 ? true : false;
    }

    const win = () => {
        let winner;

        const checkHorizontalMatch = () => board.some(row => {
            if (row.every(element => element === row[0] && row[0] !== '')) {
                winner = players.filter(player => player.getInput() === row[0])[0];
                return true;
            }
        });
        
        const checkVerticalMatch = () => {
            for (let i = 0; i < 3; i++) {
                const verticalLine = [];
                for (let y = 0; y < 3; y++) {
                    verticalLine.push(board[y][i]);
                }
                if (verticalLine.every(element => element === verticalLine[0] && verticalLine[0] !== ''))  {
                    winner = players.filter(player => player.getInput() === verticalLine[0])[0];
                    return true;
                }
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

            if (mainDiagonal.every(cell => {
                winner = players.filter(player => player.getInput() === cell)[0];
                return cell === mainDiagonal[0] && cell !== '';
            })) {
                return true;
            }

            if (antiDiagonal.every(cell => { 
                winner = players.filter(player => player.getInput() === cell)[0];
                return cell === antiDiagonal[0] && cell !== '';
            })) {
                return true;
            }

            return false;
        }

        isWon = checkHorizontalMatch() || checkVerticalMatch() || checkCrossMatch();

        return {isWon, winner};
    }
})();


function convertTo2DArray(arr, rows, cols) {
    const result = [];
    let index = 0;
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            row.push(arr[index]); // Push the HTML element into the row
            index++;
        }
        result.push(row);
    }
    return result;
}

function createPlayer (playerNumber) {
    const playerName = "Player " + playerNumber;
    let playerInput = "";
    let winCount = 0;

    switch (playerNumber) {
        case 1:
            playerInput = input.x;
            break;
        case 2:
            playerInput = input.o;
            break;
    }

    const getName = () => playerName;

    const getInput = () => playerInput;

    const incrementCount = () => winCount++;

    const getCount = () => winCount;

    return {playerName, getName, getInput, incrementCount, getCount}; 
};