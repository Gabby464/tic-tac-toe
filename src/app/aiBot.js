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
