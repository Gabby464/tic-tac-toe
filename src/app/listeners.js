const Listeners = (() => {
    const _resetButton = document.querySelector('.reset-game');
    _resetButton.addEventListener('click', (e) => {
        Game.resetGame()
        Game.hideButtons()
    })
    const _startGameButton = document.querySelector('.start-game');
    _startGameButton.addEventListener('click', () => {
        Game.popupWindow.setAttribute('style', 'display:flex');
        Game.hideButtons();
        Game.disableElement.setAttribute('style', 'display:none');
        Game.startANewGame(false)
    })
    const _formElement = document.querySelector('form');

    _formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const PlayerOneName = document.getElementById('PlayerOne-Name').value;
        const PlayerTwoName = document.getElementById('PlayerTwo-Name').value;
        Game.PlayerOne = Player(PlayerOneName, 'x', 'left');
        Game.PlayerTwo = Player(PlayerTwoName, 'o', 'right');
        Game.lastPlayer = Game.PlayerTwo;
        Game.playingWithBot = false;
        Game.popupWindow.setAttribute('style', 'display:none');
        _formElement.reset();
        Game.resetGame();
    })
    const closeElement = document.querySelector('#close-page')
    closeElement.addEventListener('click', () => {
        Game.popupWindow.setAttribute('style', 'display:none');
        Game.disableElement.setAttribute('style', 'display:inline');
        Game.disableScreen.setAttribute('style', 'display:flex')
        _formElement.reset();
    })
})()