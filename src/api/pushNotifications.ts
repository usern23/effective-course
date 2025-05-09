import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../firebase-config';

export interface FcmToken {
  token: string;
}

export const setupMessageListener = (callback: (payload: any) => void) => {
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};

export const getFCMToken = async (vapidKey: string): Promise<string | null> => {
  try {
    const currentToken = await getToken(messaging, { vapidKey });
    
    if (currentToken) {
      return currentToken;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}; 