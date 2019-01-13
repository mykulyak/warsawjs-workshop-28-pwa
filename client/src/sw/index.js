import '@babel/polyfill';
import { _ } from 'core-js';

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

async function cacheThenNetwork(request) {
  const cache = await caches.open(PRECACHE);
  const response = await cache.match(request);
  return response || fetch(request);
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(PRECACHE);
  const cachedResponse = await cache.match(request);
  if (!cachedResponse) {
    const networkResponse = await fetch(request);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  }
  return cachedResponse;
}

self.addEventListener('install', (event) => { // eslint-disable-line no-restricted-globals
  event.waitUntil(precache(PRECACHE_URLS));
});

self.addEventListener('fetch', (event) => {
  // const requestUrl = new URL(event.request.url);
  // if (requestUrl.pathname === '/') {
  //   const response = new Response('Hello, world !', {
  //     status: 200,
  //     statusText: 'Hello, world !',
  //     headers: {
  //       'Content-Type': 'text/plain',
  //     },
  //   });
  //   event.respondWith(response);
  // } else {
  //   console.log(event.request);
  //   event.respondWith(fetch(event.request));
  // }
  // console.log(event.request);
  // event.respondWith(fetch(event.request));
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/') {
    event.respondWith(staleWhileRevalidate(event.request));
  } else if (
    PRECACHE_URLS.includes(requestUrl.href) || PRECACHE_URLS.includes(requestUrl.pathname)
  ) {
    event.respondWith(cacheThenNetwork(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
});
