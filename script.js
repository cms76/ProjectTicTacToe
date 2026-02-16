//the gameboard module
const gameBoard = ( () => {
    let board = [['','',''],['','',''],['','','']];
    let lastPlayer = '';
    let nextPlayer = '';
    
    function getBoard() {
        return board;
    }
    
    //col and row are zero based
    //player must be either 'X' or 'O'
    function playerMove(row, col, player){
        let ret = false;
        let error = false;
    
        let checkWin = gameBoard.checkWin();
        if (checkWin !== '') {
            console.log("Invalid move: game already won by " + checkWin);            
            error = true;
        }

        let checkDraw = gameBoard.checkDraw();
        if (checkDraw) {
            console.log("Invalid move: game already drawn");            
            error = true;
        }

        if (lastPlayer === player) {
            console.log("Invalid move: it's the other player's turn");            
            error = true;
        }
        
        if (col < 0 || col > 2 || row < 0 || row > 2) {
            console.log("Invalid move: out of bounds");            
            error = true;
        }
        if (player !== 'X' && player !== 'O') {
            console.log("Invalid move: player must be 'X' or 'O'");            
            error = true;
        }
        if (!error && board[row][col] === '') {
            board[row][col] = player;
            lastPlayer = player;
            nextPlayer = player === 'X' ? 'O' : 'X';
            ret = true;
        } else {
            console.log("Invalid move: cell already occupied");            
        }

        //plot the board to the console for testing
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);

        return ret;
    }

    function resetBoard() {
        board = [['','',''],['','',''],['','','']];
    }

    //returns either 'X', 'O', or '' if there is no winner
    function checkWin()
    {
        //check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                return board[i][0];
            }
        }
        //check columns
        for (let j = 0; j < 3; j++) {
            if (board[0][j] !== '' && board[0][j] === board[1][j] && board[1][j] === board[2][j]) {
                return board[0][j];
            }
        }
        //check diagonals
        if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            return board[0][0];
        }
        if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            return board[0][2];
        }
        return '';
    }

    function checkDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    return false;
                }
            }
        }
        return checkWin() === '';
    }

    function checkEmpty() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] !== '') {
                    return false;
                }
            }
        }
        return true;
    }

    function getFirstPlayer() {
        const ret = Math.random() < 0.5 ? 'X' : 'O';
        nextPlayer = ret;
        return ret;
    }

    function getNextPlayer() {
        if (nextPlayer === '') {
            return getFirstPlayer();
        }
        return nextPlayer;
    }

    return {
        getBoard,
        playerMove,
        resetBoard,
        checkWin,
        checkDraw,
        checkEmpty,
        getNextPlayer
    };


})();


const viewController = ( () => {
    function updateTurnIndicator() {
        const turnIndicator = document.getElementById('turn-indicator-text');
        turnIndicator.textContent = "Player " + gameBoard.getNextPlayer() + " is up!";      
    }

    function updateGameResult() {
        const gameResultText = document.getElementById('game-result-text');
        const winner = gameBoard.checkWin();
        const draw = gameBoard.checkDraw();        
        if (winner !== '') {
            gameResultText.textContent = "Player " + winner + " wins!";
        } else if (draw) {
            gameResultText.textContent = "It's a draw!";        
        } else {
            gameResultText.textContent = "";
        }
    }

    function updateBoard() {
        const board = gameBoard.getBoard();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // get the cell element with data-index = ((i + 1) * (j + 1)) - 1
                const cell = document.querySelector(`[data-index="${(i * 3) + j}"]`);
                cell.textContent = board[i][j];
            }
        }
    }

    function handleCellClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        const row = Math.floor(index / 3);
        const col = index % 3;
        const player = gameBoard.getNextPlayer();
        if (gameBoard.playerMove(row, col, player)) {
            updateBoard();
            updateGameResult();
            updateTurnIndicator();
        }
    }

    function resetGame() {
        gameBoard.resetBoard();
        updateBoard();
        updateGameResult();
        updateTurnIndicator();
    }    

    function initialize() {
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
            cell.addEventListener('click', handleCellClick);
        });
        const resetButton = document.getElementById('restart-button');
        resetButton.addEventListener('click', resetGame);
    }

    return {
        updateTurnIndicator,
        updateGameResult,
        updateBoard,
        initialize
    };


})();

//initialize the game
viewController.updateTurnIndicator();
viewController.updateGameResult();
viewController.updateBoard();
viewController.initialize();


