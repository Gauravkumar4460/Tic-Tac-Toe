function gameBoard() {
    const row = 3;
    const column = 3;
    const board = [];

    for(let i=0;i<row;i++){
        board[i] = [];
        for(let j=0;j<column;j++){
            board[i].push(Cell());
        }
    }
    
    const printBoard = (activePlayerName) => {
        
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                const cellVal = board[i][j].getValue();
                const cellElement = document.querySelector(`.grid-item[data-row = "${i}"][data-col = "${j}"]`);
                cellElement.textContent = cellVal;
            }
        }
       // console.log(getAllValues);
        //console.log(`${activePlayerName}'s Turn.`);
        if(allCellFilled()){
            document.getElementById('message').textContent = 'Match Draw \n Game Over';
        }
        else
        document.getElementById('message').textContent = `${activePlayerName}'s Turn.`;
    };
   
    const allCellFilled = () => {
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j].getValue() == ''){
                        return false;
                }
            }
        }
        return true;
    }
    const dropToken = (activePlayerValue,row,column) => {
        //console.log('updating value.....');
    
        if(board[row][column].getValue() != ''){
            //console.log('Choose correct location in board !!');
            document.getElementById('message').textContent = '\nChoose correct Location in Board!!';
            return false;
        }
        board[row][column].setValue(activePlayerValue);
        return true;
    };

    const checkWinner = (activePlayerName) => {
        
        for(let i=0;i<3;i++){
            if(board[i][0].getValue() != '' && board[i][0].getValue() === board[i][1].getValue() && board[i][1].getValue() === board[i][2].getValue()){
                board.map((row) => row.map((cell) => cell.getValue()));
                printBoard(activePlayerName);
                //console.log(`${activePlayerName} wins the Game.`);
                document.getElementById('message').textContent = `${activePlayerName} wins the Game.`;
                return true;
            }
        }

        for(let i=0;i<3;i++){
            if(board[0][i].getValue() != '' && board[0][i].getValue() === board[1][i].getValue() && board[1][i].getValue() === board[2][i].getValue()){
                board.map((row) => row.map((cell) => cell.getValue()));
                printBoard(activePlayerName);
                //console.log(`${activePlayerName} wins the Game`);
                document.getElementById('message').textContent = `${activePlayerName} wins the Game.`;
                return true; 
            }
        }

        if(board[0][0].getValue() != '' && board[0][0].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][2].getValue()){
            board.map((row) => row.map((cell) => cell.getValue()));
            printBoard(activePlayerName);
            //console.log(`${activePlayerName} wins the Game.`);
            document.getElementById('message').textContent = `${activePlayerName} wins the Game.`;
            return true;
        }

        if(board[0][2].getValue() != '' && board[0][2].getValue() === board[1][1].getValue() && board[1][1].getValue() === board[2][0].getValue())
            {
                board.map((row) => row.map((cell) => cell.getValue()));
                printBoard(activePlayerName);
                //console.log(`${activePlayerName} wins the Game.`);
                document.getElementById('message').textContent =   `${activePlayerName} wins the Game.`;
                return true;
            }
        return false;
    };
    return {printBoard,dropToken,checkWinner};

}
function Cell(){
    let value = '';

    const getValue = () => value;

    const setValue = (toSetValue) => {
        value = toSetValue;
    };

    return {
        getValue,setValue
    };

}

function gameController(firstPlayerName = 'PlayerOne', secondPlayerName = 'secondPlayer'){

    const board = gameBoard();
 const players = [
    {playerName: firstPlayerName,
        value: 'x'
    },
    {
        playerName: secondPlayerName,
        value: 'o'
    }
 ];

 let activePlayer = players[0];

 const getActivePlayer = () => activePlayer;

 const switchPlayerTurn = () => {
     activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
 };


 const playGame = (row,column)  => {
    if(!board.dropToken(activePlayer.value,row,column)){
        switchPlayerTurn();
    }
    if(board.checkWinner(activePlayer.playerName)){
        //console.log('Game Over.');
       
        return true;
    }
    switchPlayerTurn();
    board.printBoard(activePlayer.playerName);
 }

 
 

 return {getActivePlayer,switchPlayerTurn,playGame};


}
const game = gameController('Gaurav','Saurabh');
const gridItems = document.querySelectorAll('.grid-item');

function handleClick(events) {
    const result = game.playGame(parseInt(this.getAttribute('data-row')),parseInt(this.getAttribute('data-col')));
     
    if(result === true){
        gridItems.forEach(item => {
            item.removeEventListener('click',handleClick);
        });

    }

}
const domController = function() {
    gridItems.forEach(items => {
            items.addEventListener('click',handleClick);
               });
}();

domController();