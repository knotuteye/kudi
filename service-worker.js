const PRECACHE = 'kudi-cache-v1'
const RUNTIME = 'runtime'
const PRECACHE_URLS = [
	'/index.html',
	'./',
	'/resx/css/hamburgers.css',
	'/resx/css/main.css',
	'/resx/img/cent.svg',
	'/resx/img/coin.svg',
	'/resx/img/favicon.png',
	'/resx/img/favicon-192.png',
	'/resx/img/law.svg',
	'/resx/js/main.js',
]

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(PRECACHE)
			.then((cache) => cache.addAll(PRECACHE_URLS))
			.then(self.skipWaiting())
	)
})

self.addEventListener('activate', (event) => {
	const currentCaches = [PRECACHE, RUNTIME]
	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return cacheNames.filter(
					(cacheName) => !currentCaches.includes(cacheName)
				)
			})
			.then((cachesToDelete) => {
				return Promise.all(
					cachesToDelete.map((cacheToDelete) => {
						return caches.delete(cacheToDelete)
					})
				)
			})
			.then(() => self.clients.claim())
	)
})

self.addEventListener('fetch', (event) => {
	// Skip cross-origin requests, like those for Google Analytics.
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then((cachedResponse) => {
				if (cachedResponse) {
					return cachedResponse
				}

				return caches.open(RUNTIME).then((cache) => {
					return fetch(event.request).then((response) => {
						// Put a copy of the response in the runtime cache.
						return cache
							.put(event.request, response.clone())
							.then(() => {
								return response
							})
					})
				})
			})
		)
	}
})
