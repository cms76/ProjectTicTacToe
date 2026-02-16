//the gameboard module
const gameBoard = ( () => {
    let board = [['','',''],['','',''],['','','']];
    let lastPlayer = '';
    
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
        lastPlayer = player;
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
        return Math.random() < 0.5 ? 'X' : 'O';
    }

    return {
        getBoard,
        playerMove,
        resetBoard,
        checkWin,
        checkDraw,
        checkEmpty,
        getFirstPlayer
    };


})();

