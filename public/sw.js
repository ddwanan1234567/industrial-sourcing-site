self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key.startsWith("ycjg-metal-am-") && key !== "ycjg-metal-am-v1").map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("ycjg-metal-am-v1").then((cache) =>
      cache.addAll([
        "/manifest.json",
        "/manifest.webmanifest",
        "/icon.svg"
      ])
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(fetch(event.request).catch(() => caches.match("/index.html")));
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
