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
const closeElement = document.querySelector('#close-page')







