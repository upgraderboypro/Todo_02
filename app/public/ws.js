console.log("Hii Bhuri");
const resourceToPrecache = [
  "/style.css",
  '/static/js/bundle.js',
  "/assets/images/bg-desktop-dark.jpg",
];
const cacheName = "offline";
this.addEventListener("install", (event) => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourceToPrecache);
    })
  );
}); 
this.addEventListener("fetch", (event) => {
  if(!navigator.onLine){
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
        })
      );
  }
});