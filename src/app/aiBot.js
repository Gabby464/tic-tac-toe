const AIBot = (() => {
    const _botprompt = document.querySelector('.botpopup>button')

    _botprompt.addEventListener('click', () => {
        Game.startANewGame(true)
        Game.playingWithBot = true;
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
            Game.imageTwo.setAttribute('src', 'Images/icons8-finn copy.svg')
            Game.imageOne.setAttribute('src', 'Images/icons8-finn.svg')
            Game.statusElement.textContent = `${PlayerOne.name}'s turn`
            const gameArr = gameBoard.getCurrentBoardContent();
            const nextIndex = getAiBotSelection(gameArr);
            gameBoard.getCurrentBoardFields()[nextIndex].textContent = 'o';
            Game.botsTurn = false;
            Game.lastPlayer = Game.PlayerTwo
            console.log(lastPlayer)
            Game.checkForWinnersAndTie();
        }
    }
    return {
        getAiBotSelection,
        botOnBoard,
    }
})()
