const gameBoardElement = document.querySelector('.gameboard');
let lastElement = 'o';
let PlayerOne;
let PlayerTwo;
const resetButton = document.querySelector('.reset-game');
const boardElements = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'))
const pointsDivPlayerOne = document.querySelector('.points.one');
const pointsDivPlayerTwo = document.querySelector('.points.two');
const imageOne = document.querySelector('.playerOneImage>img');
const imageTwo = document.querySelector('.playerTwoImage>img');
const disableElement = document.querySelector('.disable-clicks');
const statusElement = document.querySelector('.game-status');
const formElement = document.querySelector('form');
const startGameButton = document.querySelector('.start-game');
const popupWindow = document.querySelector('.full-screen-container')

//get main logic
const gameBoard = (() => {
    const getCurrentBoardContent = () => {
        const gameBoardFields = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'))
        const boardContent = gameBoardFields.map((field) => field.textContent)
        return boardContent
    }
    const getCurrentBoardFields = () => {
        const gameBoardFields = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'))
        return gameBoardFields
    }
    const editBoard = (() => {
        const currentBoard = getCurrentBoardFields();
        currentBoard.forEach(element => {
            element.addEventListener('click', function makeSelection(e) {
                if (e.target.textContent !== 'x' && e.target.textContent !== 'o'){
                    if (lastElement !== 'x') {
                        statusElement.textContent = `${PlayerTwo.name}'s turn`
                        imageOne.setAttribute('src', 'Images/icons8-finn copy.svg')
                        imageTwo.setAttribute('src', 'Images/icons8-finn.svg')
                        e.target.textContent = 'x';
                        lastElement = 'x'
                    } else if (lastElement !== 'o') {
                        statusElement.textContent = `${PlayerOne.name}'s turn`
                        imageTwo.setAttribute('src', 'Images/icons8-finn copy.svg')
                        imageOne.setAttribute('src', 'Images/icons8-finn.svg')
                        e.target.textContent = 'o'
                        lastElement = 'o'
                    }
                    const currentBoard = getCurrentBoardContent();
                }
            })
        })
    })()
    const resetBoard = () => {
        disableElement.setAttribute('style', 'display:none')
        boardElements.forEach(field => {
            field.textContent = ''
        })
    }
    return {
        getCurrentBoardContent,
        getCurrentBoardFields,
        resetBoard,
    }
})();

const Player = (name, selectedSymbol, position) => {
    let score = 0;
    const checkIfwinner = () => {
        const board = gameBoard.getCurrentBoardContent();
        if (board[0] == selectedSymbol && board[1] == board[0] && board[2] == board[0]) {
            return true
        } else if (board[3] == selectedSymbol && board[4] == board[3] && board[5] == board[3]) {
            return true
        } else if (board[6] == selectedSymbol && board[7] == board[6] && board[8] == board[6]) {
            return true
        } else if (board[0] == selectedSymbol && board[3] == board[0] && board[6] == board[0]) {
            return true
        } else if (board[1] == selectedSymbol && board[4] == board[1] && board[7] == board[1]) {
            return true
        } else if (board[2] == selectedSymbol && board[2] == board[5] && board[8] == board[2]) {
            return true
        } else if (board[0] == selectedSymbol && board[4] == board[0] && board[8] == board[0]) {
            return true
        } else if (board[2] == selectedSymbol && board[4] == board[2] && board[2] == board[6]) {
            return true
        } else {
            return false
        }
    }
    return {
        selectedSymbol,
        name,
        score,
        position,
        checkIfwinner
    }
}

const Game = (() => {
    const resetGame = () => {
        gameBoard.resetBoard();
        PlayerOne.score = 0;
        PlayerTwo.score = 0;
        pointsDivPlayerOne.innerHTML = "";
        pointsDivPlayerTwo.innerHTML = "";
        imageOne.setAttribute("src", 'Images/icons8-finn.svg');
        imageTwo.setAttribute("src", 'Images/icons8-finn.svg');
        statusElement.textContent = "";
    }
    const addpointsImage = (parentElement) => {
        const scoreImage = document.createElement('img');
        scoreImage.setAttribute('src', 'Images/winnerIcon.svg');
        parentElement.appendChild(scoreImage);

    }
    const winnerIsFound = (winner, loser) =>{
        winner.score += 1;
        if(winner.score < 3){
            statusElement.textContent = `${winner.name} wins the round!`
        disableElement.setAttribute('style', 'display:inline')
        setTimeout(gameBoard.resetBoard, '1800');
        setTimeout(function(){statusElement.textContent = `${loser.name}'s turn`}, '1800');
        }else{
            statusElement.textContent = `${winner.name} wins the game!!`
            disableElement.setAttribute('style', 'display:inline')
            if(winner.position === 'left') {
               imageOne.setAttribute('src', 'Images/icons8-finn.gif')
            }else{
                imageTwo.setAttribute('src', 'Images/icons8-finn.gif')
            }
        }
        
    }
    const checkForWinnersAndTie = (() => {
        const fields = gameBoard.getCurrentBoardFields();
        fields.forEach(field => {
            field.addEventListener('click', () => {
                if (PlayerOne.checkIfwinner()) {
                    addpointsImage(pointsDivPlayerOne)
                    winnerIsFound(PlayerOne, PlayerTwo);
                }else if(PlayerTwo.checkIfwinner()){
                    addpointsImage(pointsDivPlayerTwo)
                    winnerIsFound(PlayerTwo, PlayerOne)
                }else if(fields.every(field => field.textContent != '' && !PlayerOne.checkIfwinner() && !PlayerTwo.checkIfwinner())){
                    statusElement.textContent = "It's a tie :/"
                    disableElement.setAttribute('style', 'display:inline');
                    let lastPlayer;
                    if(lastElement == PlayerOne.selectedSymbol){
                        setTimeout(function(){statusElement.textContent = `${PlayerTwo.name}'s turn`}, '1200')
                    }else{
                        setTimeout(function(){statusElement.textContent = `${PlayerOne.name}'s turn`}, '1200')
                    }
                    setTimeout(gameBoard.resetBoard, '1200');
                }
            })
        })
        const startANewGame = (() => {
            startGameButton.addEventListener('click', () => {
            popupWindow.setAttribute('style', 'display:flex')
            })
            formElement.addEventListener('submit', (e) => {
                e.preventDefault();
                const PlayerOneName = document.getElementById('PlayerOne-Name').value;
                const PlayerTwoName = document.getElementById('PlayerTwo-Name').value;
                PlayerOne = Player(PlayerOneName, 'x', 'left');
                PlayerTwo = Player(PlayerTwoName, 'o', 'right');
                popupWindow.setAttribute('style', 'display:none');
                formElement.reset();
                resetGame();

            })
        })()
        const closePopUp = (() => {
            const closeElement = document.querySelector('#close-page')
            closeElement.addEventListener('click', () =>{
                popupWindow.setAttribute('style', 'display:none');
                formElement.reset();
            })
        })()
        
    })()


    return {
        resetGame,
        checkForWinnersAndTie,
        winnerIsFound,

    }
})()
resetButton.addEventListener('click', (e) => {
    Game.resetGame()
})
