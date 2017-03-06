require('./styles/app.scss');
const Game = require('./game');
const Cards = require('./cards');

Game.init(Cards);

const $startBtn = document.querySelector('.startGame');
const $modal = document.querySelector('.modalWrapper');

$startBtn.addEventListener('click', function() {
  $modal.classList.add('hide');
  Game.start();
});
