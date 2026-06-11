const CACHE_VERSION = "yyc3-portal-v2"
const STATIC_CACHE = `${CACHE_VERSION}-static`
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`
const API_CACHE = `${CACHE_VERSION}-api`

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/yyc3-dist/yanyu_cloud_192x192.png",
  "/yyc3-dist/yanyu_cloud_512x512.png",
  "/yyc3-dist/yanyu_cloud_256x256.png",
  "/yyc3-dist/yanyu_cloud_128x128.png",
  "/yyc3-dist/yanyu_cloud_64x64.png",
  "/yyc3-dist/yanyu_cloud_48x48.png",
  "/yyc3-dist/yanyu_cloud_32x32.png",
  "/yyc3-dist/yanyu_cloud_16x16.png",
  "/YYC3-Family-001.png",
  "/icon.svg",
  "/favicon.ico",
  "/yyc3-dist/favicon.ico",
]

const API_ROUTES = ["/api/chat"]
const MAX_DYNAMIC_ENTRIES = 50

// ----- Install: Cache static assets -----
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE)
      // Use individual puts instead of addAll for resilience
      for (const url of STATIC_ASSETS) {
        try {
          const response = await fetch(url)
          if (response.ok) cache.put(url, response)
        } catch {
          // Skip assets that fail to cache
        }
      }
      // Cache the offline fallback
      try {
        const offlineResp = await fetch("/")
        if (offlineResp.ok) cache.put("/", offlineResp)
      } catch { /* ignore */ }
      self.skipWaiting()
    })()
  )
})

// ----- Activate: Clean old caches -----
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE]
      await Promise.all(
        keys
          .filter((key) => !validCaches.includes(key))
          .map((key) => caches.delete(key))
      )
      self.clients.claim()
    })()
  )
})

// ----- Fetch: Strategy routing -----
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") return

  // Skip browser extensions and non-our-origin
  if (!url.origin || !url.origin.includes(self.location.origin) && !url.origin.includes("localhost")) {
    // For external resources like Spline, use network-only
    if (url.hostname.includes("spline.design")) {
      return // Let browser handle normally
    }
  }

  // ---- API routes: Network first, fallback to cache ----
  if (API_ROUTES.some((route) => url.pathname.startsWith(route))) {
    event.respondWith(networkFirst(request, API_CACHE))
    return
  }

  // ---- Next.js data / static chunks: Stale-while-revalidate ----
  if (url.pathname.includes("/_next/")) {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE))
    return
  }

  // ---- Static assets: Cache first ----
  if (
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|avif|woff2?|css|js)$/) ||
    url.pathname.startsWith("/yyc3-dist/")
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
    return
  }

  // ---- Navigation / HTML: Network first ----
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
    return
  }

  // ---- Everything else: Network first ----
  event.respondWith(networkFirst(request, DYNAMIC_CACHE))
})

// ====== Caching Strategies ======

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached
  try {
    const response = await fetch(request)
    if (response.ok && response.type === "basic") {
      const cache = await caches.open(cacheName)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    // Return cached index.html as fallback for navigation
    const fallback = await caches.match("/")
    if (fallback) return fallback
    return new Response("Offline", { status: 503 })
  }
}

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request)
    if (response.ok && response.type === "basic") {
      const cache = await caches.open(cacheName)
      // Limit dynamic cache size
      const keys = await cache.keys()
      if (keys.length >= MAX_DYNAMIC_ENTRIES) {
        await cache.delete(keys[0])
      }
      cache.put(request, response.clone())
    }
    return response
  } catch (error) {
    const cached = await caches.match(request)
    if (cached) return cached
    // For navigation requests, return cached root
    if (request.mode === "navigate") {
      const fallback = await caches.match("/")
      if (fallback) return fallback
    }
    return new Response(
      JSON.stringify({
        error: "Offline",
        message: "You are currently offline. Cached content may still be available.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    )
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok && response.type === "basic") {
        cache.put(request, response.clone())
      }
      return response
    })
    .catch(() => cached)

  return cached || fetchPromise
}
