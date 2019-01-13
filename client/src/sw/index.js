import '@babel/polyfill';

const PRECACHE = 'static-v1';

const PRECACHE_URLS = [
  // external resources
  'https://fonts.gstatic.com/s/materialicons/v42/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  // application assets
  '/',
  '/assets/index.js',
  '/assets/manifest.json',
  '/assets/icon_192x192.714a1246445a6a0da1e3aadf1451234a.png',
];

async function precache(urls) {
  const cache = await caches.open(PRECACHE);
  return cache.addAll(urls);
}

self.addEventListener('install', (event) => { // eslint-disable-line no-restricted-globals
  event.waitUntil(precache(PRECACHE_URLS));
});
