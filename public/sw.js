// Service Worker for nasjp.dev
// 画像とアセットの事前キャッシング戦略

const CACHE_NAME = 'nasjp-dev-v1';
const PRECACHE_URLS = [
  '/gohan.webp',
  '/',
];

// サービスワーカーのインストール時
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// サービスワーカーのアクティベート時
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// フェッチイベント - キャッシュファーストストラテジー（画像のみ）
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // 画像リクエストのみキャッシュファーストで処理
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // オフライン時のフォールバック（必要に応じて）
          return new Response('', { status: 503 });
        })
    );
  }
  // その他のリクエストはネットワークファースト
  else if (request.method === 'GET') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});