const CACHE_NAME = "bianca-v1";

// Todos os arquivos que o app precisa pra funcionar offline
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png"
];

// INSTALL — cacheia tudo na primeira vez
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("💾 Cacheando assets...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ACTIVATE — remove caches antigos
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log("🗑️ Removendo cache antigo:", key);
            return caches.delete(key);
          })
      )
    )
  );
  self.clients.claim();
});

// FETCH — cache first, network fallback
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        // Se não tiver internet e não tiver no cache, retorna index.html
        return caches.match("/index.html");
      });
    })
  );
});
