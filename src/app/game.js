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
        disableScreen.setAttribute('style', 'display:flex');
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
            if ('o' == PlayerOne.selectedSymbol) {
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
            Game.showButtons();

        } 
        disableElement.setAttribute('style', 'display:none')
    }


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
        makeSelectionAndChangeTurns,
        showButtons,
        hideButtons
    }
})()
