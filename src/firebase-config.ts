import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDT30wDMzlbu-MhvGXIGEKSW5hRPHhHvnk",
  authDomain: "marvelapp-213f7.firebaseapp.com",
  projectId: "marvelapp-213f7",
  storageBucket: "marvelapp-213f7.firebasestorage.app",
  messagingSenderId: "878563975696",
  appId: "1:878563975696:web:6af722e8219804c8b02095",
  measurementId: "G-80DJ8ZN2LS"
};

export const FIREBASE_VAPID_KEY = 'BCiEEvji3zq_QA8a_VSISAsL31Qda_mHtppaDiQi0cvZf_3LAcO3KS82M_1wE2VblCnOIEAdewiIxBL9HlX4YwI';

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export default app; 