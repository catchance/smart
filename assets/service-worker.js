var CACHE_NAME = "xchance.xyz::v1::static";

var urlsToCache = [
    '/',
    '/index.json',
    '/css/main.min.css',
    '/img/clear.png',
    '/img/search.png'
];

self.addEventListener("install", function (event) {
    console.log('install' + event);
    // Perform install steps
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).then(function () {
            self.skipWaiting()
        })
    }))
})

self.addEventListener("fetch", function (a) {
    console.log('fetch:' + a.request.url);
    var b = a.request;
    if ("GET" !== b.method) return void a.respondWith(fetch(b));
    a.respondWith(caches.open(CACHE_NAME).then(function (c) {
        return c.match(a.request).then(function (d) {
            return d || fetch(a.request).then(function (a) {
                return a.url.match(/\/post\//) && c.put(b, a), a
            })
        })
    }))
});

self.addEventListener('activate', function (event) {
    console.log('activate' + event);
// 监听worker的activate事件
    event.waitUntil( // 延迟activate事件直到
        Promise.all([
            // 更新客户端
            clients.claim(),
            // 清理旧版本
            caches.keys().then(cacheList => Promise.all(
                cacheList.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        caches.delete(cacheName);
                    }
                })
            ))
        ])
    )
});
