importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDT30wDMzlbu-MhvGXIGEKSW5hRPHhHvnk",
  authDomain: "marvelapp-213f7.firebaseapp.com",
  projectId: "marvelapp-213f7",
  storageBucket: "marvelapp-213f7.firebasestorage.app",
  messagingSenderId: "878563975696",
  appId: "1:878563975696:web:6af722e8219804c8b02095",
  measurementId: "G-80DJ8ZN2LS"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title || 'Marvel App';
  const notificationOptions = {
    body: payload.notification.body || 'Новое уведомление',
    data: {
      url: payload.notification.click_action || '/'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.registration.scope)) {
          return client.focus();
        }
      }
      
      return clients.openWindow(urlToOpen);
    })
  );
}); 