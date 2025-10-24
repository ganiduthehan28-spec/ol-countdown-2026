const CACHE_NAME = 'ol-countdown-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/_next/static/css',
  '/_next/static/chunks',
  '/_next/static/webpack',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
