const gameBoardElement = document.querySelector('.gameboard');
let lastElement = 'o';
const resetButton = document.querySelector('.reset-game');
const boardElements = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'))
const pointsDivPlayerOne = document.querySelector('.points.one');
const pointsDivPlayerTwo = document.querySelector('.points.two');
const imageOne = document.querySelector('.playerOneImage>img');
const imageTwo = document.querySelector('.playerTwoImage>img');
const disableElement = document.querySelector('.disable-clicks')
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
                        imageOne.setAttribute('src', 'Images/icons8-finn copy.svg')
                        imageTwo.setAttribute('src', 'Images/icons8-finn.svg')
                        e.target.textContent = 'x';
                        lastElement = 'x'
                    } else if (lastElement !== 'o') {
                        imageTwo.setAttribute('src', 'Images/icons8-finn copy.svg')
                        imageOne.setAttribute('src', 'Images/icons8-finn.svg')
                        e.target.textContent = 'o'
                        lastElement = 'o'
                    }
                    const currentBoard = getCurrentBoardContent();
                    console.log(currentBoard)
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
        editBoard
    }
})();



const Player = (name, selectedSymbol) => {
    let score = 0;
    const checkIfwinner = () => {
        const board = gameBoard.getCurrentBoardContent();
        console.log(gameBoard.getCurrentBoardContent())
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
        checkIfwinner
    }
}

const Game = (() => {
    const resetGame = () => {
        gameBoard.resetBoard();
        John.score = 0;
        Jim.score = 0;
        pointsDivPlayerOne.innerHTML = "";
        pointsDivPlayerTwo.innerHTML = "";
        imageOne.setAttribute("src", 'Images/icons8-finn.svg');
        imageTwo.setAttribute("src", 'Images/icons8-finn.svg');
    }
    const addpointsImage = (parentElement) => {
        const scoreImage = document.createElement('img');
        scoreImage.setAttribute('src', 'Images/winnerIcon.svg');
        parentElement.appendChild(scoreImage);

    }
    const winnerIsFound = (winner) =>{
        winner.score += 1;
        if(winner.score < 3){
        disableElement.setAttribute('style', 'display:inline')
        setTimeout(gameBoard.resetBoard, '1800');
        
        }else{
            disableElement.setAttribute('style', 'display:inline')
            if (winner.name == 'johny') {
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
                if (John.checkIfwinner()) {
                    addpointsImage(pointsDivPlayerOne)
                    winnerIsFound(John)
                }else if(Jim.checkIfwinner()){
                    addpointsImage(pointsDivPlayerTwo)
                    winnerIsFound(Jim)
                }else if(fields.every(field => field.textContent != '' && !John.checkIfwinner() && !Jim.checkIfwinner())){
                    disableElement.setAttribute('style', 'display:inline')
                    setTimeout(gameBoard.resetBoard, '1200');
                }
            })
        })
        
        
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
const John = Player('johny', 'x');
const Jim = Player('jimmy', 'o')