const Card = require('./card');
const Timer = require('./timer');
const Analytics = require('./analytics');

let CARDS = [];

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

const Game = function () {
  this.$table = document.querySelector('.memory-game-table');
  this.table = [];
  this.rows = 6;
  this.cols = 4;
  this.guess = null;
  this.paused = false;
};

Game.prototype.init = function (cards) {
  CARDS = cards;
  this.addListeners();
  Analytics.pageview('indexPage');
};

Game.prototype.start = function(mode) {
  this.cards = this.shuffleCardsArray(CARDS.concat(CARDS));
  this.table = this.buildTable();
  this.renderTable();
  Timer.start();
  Analytics.pageview('gamePage');
  if (mode === 'Restart') {
    Analytics.sendEvent('restarted');
  }
};

Game.prototype.buildTable = function() {
  let table = [];
  for (let i = 0; i < this.rows; i++) {
    table[i] = [];
    for (let j = 0; j < this.cols; j++) {
      table[i][j] = Card(this.cards[(i * this.cols) + j], i, j);
    }
  }
  return table;
};

Game.prototype.addListeners = function () {
  this.$table.addEventListener('click', this.cardClicked.bind(this));
};

Game.prototype.cardClicked = function (e) {
  const cell = findAncestor(e.target, 'memory-game-cell');

  if (!cell) return;
  
  const row = cell.parentElement;

  const card = this.table[row.rowIndex][cell.cellIndex];

  if (!this.paused && !card.isMatch() && !card.isPick()) {
    card.setPick();
    if (!this.guess) {
      this.guess = card;
    } else if (card.is(this.guess)) {
      this.guess.setMatch();
      card.setMatch();
      this.guess = null;
    } else {
      this.paused = true;
      setTimeout(() => {
        this.guess.reset();
        card.reset();
        this.guess = null;
        this.paused = false;
      }, 600);
    }

    if (this.win()) {
      this.stop();
    }

  }
};

Game.prototype.win = function() {
  if (document.querySelectorAll('.matched').length === 24) {
    Timer.pause();
    setTimeout(() => {
      this.showWinModal();
    }, 600);
  }
};

Game.prototype.showWinModal = function() {
  Analytics.pageview('completePage');
  const $modal = document.querySelector('.modalWrapper');
  const $score = document.createElement('p');


  $modal.querySelector('.modal__header').innerHTML = 'Cogragualtions!!';
  $score.innerHTML = 'You have completed in ' + Timer.getMin() + ' : ' + Timer.getSec();

  $modal.querySelector('.modal__body').innerHTML = '';
  $modal.querySelector('.modal__body').appendChild($score);

  $modal.querySelector('.startGame').innerHTML = 'Restart';

  $modal.classList.remove('hide');
};

Game.prototype.renderTable = function () {
  var dom = '';

  for (let i = 0; i < this.rows; i++) {
    dom += '<tr>';
    for (let j = 0; j < this.cols; j++) {
      dom += '<td class="memory-game-cell">';
      dom += this.table[i][j].render();
      dom += '</td>';
    }
    dom += '</tr>';
  }
  this.$table.innerHTML = dom;
};

Game.prototype.shuffleCardsArray = function (cards) {
  let len = cards.length;

  while (len > 0) {
    let index = Math.floor(Math.random() * len);
    len--;
    let temp = cards[len];
    cards[len] = cards[index];
    cards[index] = temp;
  }
  return cards;
};


module.exports = new Game();
