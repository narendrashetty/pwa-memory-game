const Card = require('./card');


const Game = function () {
  this.$table = document.querySelector('.memory-game-table');
  this.table = [];
  this.rows = 6;
  this.cols = 4;
  this.guess = null;
  this.paused = false;
};

Game.prototype.init = function (cards) {
  this.cards = this.shuffleCardsArray(cards.concat(cards));
  this.table = this.buildTable();
  const dom = this.renderTable();
  this.$table.innerHTML = dom;
  this.addListeners();
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
  const cell = e.target.parentElement.parentElement.parentElement;
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
  }

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

  return dom;
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
