import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import "./App.css";
import PwaInstaller from "./components/PwaInstaller";
import { useEffect } from "react";
import { registerServiceWorker, requestNotificationPermission } from "./serviceWorkerRegistration.js";
import { getToken } from 'firebase/messaging';
import { messaging, FIREBASE_VAPID_KEY } from './firebase-config';
import { setupMessageListener } from './api/pushNotifications';

const registerFCMServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return;
  
  try {
    await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  } catch (_) {
  }
};

const getFCMToken = async (vapidKey: string) => {
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    
    if (currentToken) {
      return currentToken;
    } else {
      return null;
    }
  } catch (_) {
    return null;
  }
};

const App = () => {
  useEffect(() => {
    const initApp = async () => {
      
      try {
        const registration = await registerServiceWorker();
        
        if (registration) {
          const permission = await requestNotificationPermission();
          
          if (permission === 'granted') {
            await getFCMToken(FIREBASE_VAPID_KEY);
          }
        }
        await registerFCMServiceWorker();
      } catch (_) {
      }
    };
    
    setTimeout(() => {
      initApp();
    }, 1000);

    const unsubscribe = setupMessageListener((_) => {});
    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BrowserRouter>
      <Router />
      <PwaInstaller />
    </BrowserRouter>
  );
};

export default App;
