/* ============================================================
   SOLARA DESIGN - Service Worker
   Cache-first for assets, network-first for HTML pages.
   ============================================================ */

var CACHE_NAME = 'solara-v5';
var ASSETS_TO_PRECACHE = [
  '/',
  '/assets/css/styles.min.css',
  '/assets/js/main.min.js',
  '/assets/js/components.min.js',
  '/assets/images/favicon.svg',
  '/manifest.json',
  '/assets/images/icon-192.png'
];

// Install: precache core assets
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS_TO_PRECACHE);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names.filter(function (name) { return name !== CACHE_NAME; })
             .map(function (name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Fetch strategy
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  // Skip non-GET and cross-origin
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;

  // HTML pages: network-first (fresh content, fallback to cache)
  if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request).then(function (response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
        return response;
      }).catch(function () {
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  // Assets (CSS, JS, images): cache-first (fast, fallback to network)
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (response) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, clone); });
        return response;
      });
    })
  );
});
