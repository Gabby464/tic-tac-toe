const Listeners = (() => {
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
        lastPlayer = PlayerTwo;
        playingWithBot = false;
        popupWindow.setAttribute('style', 'display:none');
        formElement.reset();
        Game.resetGame();
    })
        closeElement.addEventListener('click', () => {
            popupWindow.setAttribute('style', 'display:none');
            disableElement.setAttribute('style', 'display:inline');
            disableScreen.setAttribute('style', 'display:flex')
            formElement.reset();
        })
    })()