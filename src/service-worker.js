const CACHE_NAME = 'versiion-1';
// const urlsToCache = ['index.html'];

const ignored = self.__WB_MANIFEST;

self.addEventListener('install', async (event) => {
    console.log('install')
    // const cache = await caches.open(CACHE_NAME);
    // await cache.addAll(urlsToCache);
});

self.addEventListener('fetch', function(event) {
    console.log('fetch')
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
                let responseClone = response.clone();
                caches.open(CACHE_NAME).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            })
        }
    }));
});

self.addEventListener('activate', (event) => {
    console.log('activate')
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(
            cacheNames.map(cacheName => {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    );
});



