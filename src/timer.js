const Timer = function() {
  this.$time = document.querySelector('.time');
  this.min = 0;
  this.sec = 0;
  this.interval = null;
};

Timer.prototype.start = function() {
  if (this.interval) this.stop();
  this.interval = setInterval(() => {
    this.sec++;
    if (this.sec === 60) {
      this.min++;
      this.sec = 0;
    }
    this.render();
  }, 1000);
};

Timer.prototype.stop = function() {
  this.pause();
};

Timer.prototype.pause = function() {
  clearInterval(this.interval);
  this.interval = null;
};

Timer.prototype.getMin = function() {
  return (this.min < 10) ? '0' + this.min : this.min;
};

Timer.prototype.getSec = function() {
  return (this.sec < 10) ? '0' + this.sec : this.sec;
};

Timer.prototype.getTime = function() {
  return this.getMin() + ' : ' + this.getSec();
};

Timer.prototype.render = function() {
  this.$time.innerHTML = this.getMin() + ' : ' + this.getSec();
};

module.exports = new Timer();
