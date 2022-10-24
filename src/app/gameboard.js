const gameBoard = (() => {
    
    const gameBoardElement = document.querySelector('.gameboard');
    const boardElements = Array.from(gameBoardElement.querySelectorAll('.gameboard-field'))
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
                if (playingWithBot && Game.gameStarted) {
                    if (e.target.textContent == "" && !botsTurn) {
                        Game.makeSelectionAndChangeTurns(e.target, Game.PlayerOne, Game.PlayerTwo);
                    }
                    if (botsTurn) {

                    }
                } else if (Game.gameStarted) {
                    if (e.target.textContent == "") {
                        if (lastPlayer.selectedSymbol === 'o') {
                            Game.makeSelectionAndChangeTurns(e.target, Game.PlayerOne, Game.PlayerTwo)
                        } else {
                            Game.makeSelectionAndChangeTurns(e.target, Game.PlayerOne, Game.PlayerTwo)
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