// Service worker v2 — limpia cachés antiguos y no intercepta nada.
// Los datos SIEMPRE vienen de la red (Supabase en tiempo real).
self.addEventListener('install', function(e) { self.skipWaiting(); });
self.addEventListener('activate', function(e) {
  e.waitUntil((async function() {
    var keys = await caches.keys();
    await Promise.all(keys.map(function(k) { return caches.delete(k); }));
    await self.clients.claim();
  })());
});
// Sin handler de fetch: el navegador va directo a la red.

// Handler de fetch vacío: cumple criterios de instalación PWA sin interceptar nada.
self.addEventListener('fetch', function() {});
