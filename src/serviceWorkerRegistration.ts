const isServiceWorkerSupported = 'serviceWorker' in navigator && 'PushManager' in window;

export function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!isServiceWorkerSupported) {
    return Promise.resolve(null);
  }

  return navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      return registration;
    })
    .catch(error => {
      return null;
    });
}

export function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return Promise.resolve('denied' as NotificationPermission);
  }

  return Notification.requestPermission();
}

export function checkNotificationPermission(): NotificationPermission | null {
  if (!('Notification' in window)) {
    return null;
  }
  
  return Notification.permission;
} 