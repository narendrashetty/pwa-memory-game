const Card = function(value, row, col) {
  this.match = false;
  this.pick = false;
  this.value = value;
  this.row = row;
  this.col = col;
};

Card.prototype.isMatch = function() {
  return this.match;
};

Card.prototype.setMatch = function() {
  this.match = true;
  this.update();
};

Card.prototype.isPick = function() {
  return this.pick;
};

Card.prototype.setPick = function() {
  this.pick = true;
  this.update();
};

Card.prototype.reset = function() {
  this.pick = false;
  this.match = false;
  this.update();
};

Card.prototype.is = function(_card) {
  return this.value.id === _card.getValue().id;
};

Card.prototype.getValue = function() {
  return this.value;
};

Card.prototype.render = function() {
  let card = '<div class="card" data-row=' + this.row + ' data-col=' + this.col + ' data-id=' + this.value.id + '>';
  card += '<div class="inside">';
  card += '<div class="front">';
  card += this.value.id;
  card += '</div>';
  card += '<div class="back">';
  card += 'M';
  card += '</div>';
  card += '</div>';
  card += '</div>';
  return card;
};


Card.prototype.update = function() {
  const $dom = document.querySelector('div[data-row="' + this.row + '"][data-col="' + this.col + '"]');
  const $inside = $dom.querySelector('.inside');

  if (this.pick) {
    $inside.classList.add('picked');
  } else {
    $inside.classList.remove('picked');
  }

  if (this.match) {
    $inside.classList.add('matched');
  } else {
    $inside.classList.remove('mached');
  }
};


module.exports = (value, row, col) => new Card(value, row, col);
