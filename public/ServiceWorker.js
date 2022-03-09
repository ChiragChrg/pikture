const CacheName = "V-1.5";
const CacheList = [
  "/",
  "assets/fonts/quicksand-v28-latin-regular.eot",
  "assets/fonts/quicksand-v28-latin-regular.svg",
  "assets/fonts/quicksand-v28-latin-regular.ttf",
  "assets/fonts/quicksand-v28-latin-regular.woff",
  "assets/fonts/quicksand-v28-latin-regular.woff2",
  "assets/icons/48.png",
  "assets/icons/72.png",
  "assets/icons/96.png",
  "assets/icons/128.png",
  "assets/icons/144.png",
  "assets/icons/192.png",
  "assets/icons/384.png",
  "assets/icons/512.png",
  "index.html",
  "manifest.json",
  "ServiceWorker.js",
  "../src/index.js",
  "../src/App.js",
  "../src/App.css",
  "../src/Mobile.css",
  "../src/components/Navbar.js",
  "../src/components/SearchBar.js",
  "../src/components/Home.js",
  "../src/components/About.js",
  "../src/components/Footer.js",
  "../src/components/API/Search.js",
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
