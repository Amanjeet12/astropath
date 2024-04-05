import axios from 'axios';

export const API = axios.create({
  // baseURL: 'https://api.astropath.co.in',
  baseURL: 'https://dev.astropath.co.in/',
  // baseURL: 'https:/astrologer.astropath.co.in',
});
