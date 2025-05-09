const CACHE_NAME = 'marvel-app-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Очистка устаревших кэшей
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('push', event => {
  let notificationData = {};
  
  try {
    notificationData = event.data.json().notification || {};
  } catch (e) {
    notificationData = {
      title: 'Уведомление',
      body: event.data ? event.data.text() : 'Новое уведомление'
    };
  }
  
  const options = {
    body: notificationData.body || 'Получено новое уведомление',
    data: {
      url: notificationData.click_action || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'Marvel App', 
      options
    )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const clickUrl = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope) && 'focus' in client) {
          return client.focus();
        }
      }

      if (clientList.length > 0) {
        for (const client of clientList) {
          if ('focus' in client) {
            return client.focus();
          }
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(clickUrl);
      }
    })
  );
}); 