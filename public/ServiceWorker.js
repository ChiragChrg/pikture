const CacheName = "V-2.4";
const CacheList = [
  "/",
  "assets/icons/48.png",
  "assets/icons/72.png",
  "assets/icons/96.png",
  "assets/icons/128.png",
  "assets/icons/144.png",
  "assets/icons/192.png",
  "assets/icons/384.png",
  "assets/icons/512.png",
  "assets/icons/icon.js",
  "assets/icons/favicon.svg",
  "index.html",
  "offline.html",
  "manifest.json",
  "ServiceWorker.js",
];

//Installing Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CacheName).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(CacheList);
    })
  );
});

//Fetching Service Worker
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("./offline.html"))
      );
    })
  );
});

//Activating Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (CacheName.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
