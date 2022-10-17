const gameBoardElement = document.querySelector('.gameboard');
let lastElement = 'o';
let PlayerOne;
let PlayerTwo;
let lastPlayer;
let botsTurn = false;
let playingWithBot = false;
let gameStarted = false;
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
const botprompt = document.querySelector('.botpopup>button')
const disableScreen = document.querySelector('.buttons');


const gameBoard = (() => {
    const getCurrentBoardContent = () => {
        const gameBoardFields = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'))
        const boardContent = gameBoardFields.map((field) => field.textContent)
        return boardContent
    }
    const getCurrentBoardFields = () => {
        const gameBoardFields = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'));
        return gameBoardFields
    }
    const editBoard = (() => {
        const currentBoard = getCurrentBoardFields();
        currentBoard.forEach(element => {
            element.addEventListener('click', function makeSelection(e) {
                if (playingWithBot && gameStarted) {
                    if (e.target.textContent == "" && !botsTurn) {
                        Game.makeSelectionAndChangeTurns(e.target, PlayerOne, PlayerTwo);
                    }
                    if (botsTurn) {

                    }
                } else if (gameStarted) {
                    if (e.target.textContent == "") {
                        if (lastPlayer.selectedSymbol === 'o') {
                            Game.makeSelectionAndChangeTurns(e.target, PlayerOne, PlayerTwo)
                        } else {
                            Game.makeSelectionAndChangeTurns(e.target, PlayerTwo, PlayerOne)
                        }
                    }
                }
            })
        })

    })()

    const cleanBoard = () => {
        disableElement.setAttribute('style', 'display:none')
        boardElements.forEach(field => {
            field.textContent = ''
        })
    }
    return {
        getCurrentBoardContent,
        getCurrentBoardFields,
        cleanBoard,
        editBoard,
    }
})();

const Player = (name, selectedSymbol, position) => {
    let score = 0;
    const checkIfwinner = () => {
        const board = gameBoard.getCurrentBoardContent();
        if (board[0] == selectedSymbol && board[1] == board[0] && board[2] == board[0] ||
            board[3] == selectedSymbol && board[4] == board[3] && board[5] == board[3] ||
            board[6] == selectedSymbol && board[7] == board[6] && board[8] == board[6] ||
            board[0] == selectedSymbol && board[3] == board[0] && board[6] == board[0] ||
            board[1] == selectedSymbol && board[4] == board[1] && board[7] == board[1] ||
            board[2] == selectedSymbol && board[2] == board[5] && board[8] == board[2] ||
            board[0] == selectedSymbol && board[4] == board[0] && board[8] == board[0] ||
            board[2] == selectedSymbol && board[4] == board[2] && board[2] == board[6]) {
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
        checkIfwinner,
    }
}
const Game = (() => {
    const resetGame = () => {
        gameBoard.cleanBoard();
        PlayerOne.score = 0;
        PlayerTwo.score = 0;
        pointsDivPlayerOne.innerHTML = "";
        pointsDivPlayerTwo.innerHTML = "";
        imageOne.setAttribute("src", 'Images/icons8-finn.svg');
        imageTwo.setAttribute("src", 'Images/icons8-finn.svg');
        statusElement.textContent = `${PlayerOne.name} starts the game!`;
        gameStarted = true;
        botsTurn = false;
    }
    const showButtons = () => {
        disableScreen.setAttribute('style', 'display:inline');
    }
    showButtons()//showed by default
    const hideButtons = () => {
        disableScreen.setAttribute('style', 'display:none');
    }
    const addpointsImage = (parentElement) => {
        const scoreImage = document.createElement('img');
        scoreImage.setAttribute('src', 'Images/winnerIcon.svg');
        parentElement.appendChild(scoreImage);
    }
    const winnerIsFound = (winner, loser) => {
        winner.score += 1;
        if (winner.score < 3) {
            Game.showButtons()
            statusElement.textContent = `${winner.name} wins the round!`
            disableElement.setAttribute('style', 'display:inline')
            setTimeout(gameBoard.cleanBoard, '1200');
            setTimeout(() => {
                statusElement.textContent = `${loser.name}'s turn`
            }, '1200');
            if (botsTurn) {
                setTimeout(AIBot.botOnBoard, '2000')
            }
        } else {
            statusElement.textContent = `${winner.name} wins the game!!`
            disableElement.setAttribute('style', 'display:inline')
            Game.showButtons()

            if (winner.position === 'left') {
                imageOne.setAttribute('src', 'Images/icons8-finn.gif')
            } else {
                imageTwo.setAttribute('src', 'Images/icons8-finn.gif')
            }
        }

    }
    const checkForWinnersAndTie = () => {
        const fields = gameBoard.getCurrentBoardFields();
        if (PlayerOne.checkIfwinner()) {
            addpointsImage(pointsDivPlayerOne)
            winnerIsFound(PlayerOne, PlayerTwo);
        } else if (PlayerTwo.checkIfwinner()) {
            addpointsImage(pointsDivPlayerTwo)
            winnerIsFound(PlayerTwo, PlayerOne)
        } else if (fields.every(field => field.textContent != '' && !PlayerOne.checkIfwinner() && !PlayerTwo.checkIfwinner())) {
            statusElement.textContent = "It's a tie :/"
            Game.showButtons()
            disableElement.setAttribute('style', 'display:inline');
            if (lastElement == PlayerOne.selectedSymbol) {
                setTimeout(function () {
                    statusElement.textContent = `${PlayerTwo.name}'s turn`
                }, '1200')
            } else {
                setTimeout(function () {
                    statusElement.textContent = `${PlayerOne.name}'s turn`
                }, '1200')
            }
            setTimeout(gameBoard.cleanBoard, '1200');
            if (botsTurn && playingWithBot) {
                setTimeout(AIBot.botOnBoard, '100')
            }
        } 
        else{
            if (botsTurn && playingWithBot) {
                setTimeout(AIBot.botOnBoard, '1200')
            }
        }
    }

    const startANewGame = (isBotSelected) => {
        gameStarted = true;
        if (isBotSelected) {
            playingWithBot = true
            PlayerOne = Player('Human', 'x', 'left');
            PlayerTwo = Player('Computer', 'o', 'right');
            popupWindow.setAttribute('style', 'display:none');
            resetGame();
        } 
        disableElement.setAttribute('style', 'display:none')
    }

    const closePopUp = (() => {
        const closeElement = document.querySelector('#close-page')
        closeElement.addEventListener('click', () => {
            popupWindow.setAttribute('style', 'display:none');
            formElement.reset();
        })
    })()
    const makeSelectionAndChangeTurns = (element, currentPlayer, nextPlayer) => {
        disableScreen.setAttribute('style', 'display:none');
        statusElement.textContent = `${nextPlayer.name}'s turn`
        if (currentPlayer.position === 'left') {
            imageOne.setAttribute('src', 'Images/icons8-finn copy.svg')
            imageTwo.setAttribute('src', 'Images/icons8-finn.svg')
        } else {
            imageTwo.setAttribute('src', 'Images/icons8-finn copy.svg')
            imageOne.setAttribute('src', 'Images/icons8-finn.svg')
        }
        element.textContent = currentPlayer.selectedSymbol;
        if (playingWithBot) {
            botsTurn = true
        }
        lastPlayer = currentPlayer;
        Game.checkForWinnersAndTie();
    }

    return {
        resetGame,
        checkForWinnersAndTie,
        winnerIsFound,
        startANewGame,
        closePopUp,
        makeSelectionAndChangeTurns,
        showButtons,
        hideButtons
    }
})()

const AIBot = (() => {
    botprompt.addEventListener('click', () => {
        Game.startANewGame(true)
        playingWithBot = true;
    })
    const getAiBotSelection = (gameArr) => {
        const possibleMoves = [];
        for (let i = 0; i < gameArr.length; i++) {
            if (gameArr[i] === "") {
                possibleMoves.push(i);
            }
        }
        let randomIndex = Math.floor(Math.random() * possibleMoves.length);
        return possibleMoves[randomIndex];
    }
    const botOnBoard = () => {
        if (playingWithBot) {
            imageTwo.setAttribute('src', 'Images/icons8-finn copy.svg')
            imageOne.setAttribute('src', 'Images/icons8-finn.svg')
            statusElement.textContent = `${PlayerOne.name}'s turn`
            const gameArr = gameBoard.getCurrentBoardContent();
            const nextIndex = getAiBotSelection(gameArr);
            gameBoard.getCurrentBoardFields()[nextIndex].textContent = 'o';
            botsTurn = false;
            lastPlayer = PlayerTwo
            console.log(lastPlayer)
            Game.checkForWinnersAndTie();
        }
    }
    return {
        getAiBotSelection,
        botOnBoard,
    }
})()


resetButton.addEventListener('click', (e) => {
    Game.resetGame()
    Game.hideButtons()
})
startGameButton.addEventListener('click', () => {
    popupWindow.setAttribute('style', 'display:flex');
    Game.hideButtons();
    disableElement.setAttribute('style', 'display:none');
    Game.startANewGame(false)
})
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const PlayerOneName = document.getElementById('PlayerOne-Name').value;
    const PlayerTwoName = document.getElementById('PlayerTwo-Name').value;
    PlayerOne = Player(PlayerOneName, 'x', 'left');
    PlayerTwo = Player(PlayerTwoName, 'o', 'right');
    popupWindow.setAttribute('style', 'display:none');
    formElement.reset();
    Game.resetGame();
})