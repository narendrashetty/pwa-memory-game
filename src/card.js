const Card = function(value) {
  this.matched = false;
  this.picked = false;
  this.value = value;
};

Card.prototype.render = function() {

  let card = '<div class="card" data-id=' + this.value.id + '>';
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



module.exports = (value) => new Card(value);
