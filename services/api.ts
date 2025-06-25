import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokedex-back-end-production-9709.up.railway.app', 
  headers: {
    'Content-Type': 'application/json',
  },
});
