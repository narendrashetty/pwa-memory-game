const Game = function() {
  this.$table = document.querySelector('.memory-game-table');
  this.rows = 6;
  this.cols = 4;
};

Game.prototype.init = function(cards) {
  this.cards = this.shuffleCards(cards.concat(cards));
  const dom = this.buildDOM();
  this.$table.innerHTML = dom;
};

Game.prototype.buildDOM = function() {
  var dom = '';

  for (let i = 0; i < this.rows; i++) {
    dom += '<tr>';
    for (let j = 0; j < this.cols; j++) {
      dom += '<td class="memory-game-cell">';
      dom += this.cards[(i * this.cols) + j].id;
      dom += '</td>';
    }
    dom += '</tr>';
  }

  return dom;
};

Game.prototype.shuffleCards = function(cards) {
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
