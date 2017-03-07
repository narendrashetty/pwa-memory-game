require('./styles/app.scss');
require('./manifest.json');
require('./images/192.png');
require('./images/168.png');
require('./images/144.png');
require('./images/96.png');
require('./images/72.png');
require('./images/48.png');
const Game = require('./game');
const Cards = require('./cards');

Game.init(Cards);

const $startBtn = document.querySelector('.startGame');
const $modal = document.querySelector('.modalWrapper');

$startBtn.addEventListener('click', function() {
  $modal.classList.add('hide');
  Game.start();
});

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(function(registration) {
      console.log('Service Worker Registered');
    });

  navigator.serviceWorker.ready.then(function(registration) {
    console.log('Service Worker Ready');
  });
}
