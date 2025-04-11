import axios from 'axios';
import md5 from 'md5';

const ts = Date.now();
const privateKey = import.meta.env.VITE_PRIVATE_API_KEY;
const publicKey = import.meta.env.VITE_PUBLIC_API_KEY;
const hash = md5(ts + privateKey + publicKey);

const instance = axios.create({
  baseURL: 'https://gateway.marvel.com/',
  params: {
    apikey: publicKey,
    ts: ts,
    hash: hash
  }
});

export default instance; 