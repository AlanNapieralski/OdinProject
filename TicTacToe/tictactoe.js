const input = {
    x: "x",
    o: "o"
};

const gameboard = (function () {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getBoard = () => board;

    const fillSquare = (cellIndex, input) =>  {
        console.log(cellIndex);
        const {x, y} = cellIndex;
        board[x][y] = input;
    }

    return { getBoard, fillSquare };
})();

const game = (function () {
    // DOM interaction
    const btns = document.getElementsByClassName('square');
    const text = document.querySelector('h1');

    const rows = 3;
    const cols = 3;
    const btns2D = convertTo2DArray(btns, rows, cols);

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

    // game
    let board = gameboard.getBoard();
    
    const players = [
        playerOne = createPlayer(1),
        playerTwo = createPlayer(2)
    ];
    
    let activePlayer = players[0];

    let winner;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const restart = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        for (let btn of btns) {
            const cell = btn.querySelector('div');
            cell.className = "nothing";
        }

        activePlayer = players[0];

    }

    const playRound = (indexes) => {
        text.innerText = `${activePlayer.getName()}'s turn 🤔`

        gameboard.fillSquare(indexes, activePlayer.getInput());

        if (!(draw() || win())) {
            switchPlayerTurn();
        } else if (win()) {
            text.innerText = `${winner.getName()} have won 😎`
            restart();
        } else if (draw()) {
            text.innerText = `Draw 🙀`
            restart();
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

        return checkHorizontalMatch() || checkVerticalMatch() || checkCrossMatch();
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

    return {playerName, getName, getInput}; 
};