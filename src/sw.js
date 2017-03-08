const VERSION = 'v4';

const {
  assets,
} = global.serviceWorkerOption;

let ASSETS = [
  '/',
  ...assets
];


self.addEventListener('install', e => {
  e.waitUntil(
    global.caches.open('MEMORY-GAME-' + VERSION).then(cache => {
      return cache.addAll(ASSETS)
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  const cacheWhitelist = ['MEMORY-GAME-' + VERSION];

  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }    
      }));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});









