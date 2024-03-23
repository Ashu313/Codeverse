import axios from 'axios';
import { isAdmin } from './utils';
//https://api-course.vercel.app
const http = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000 * 5, // Wait for 5 seconds
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

// Set the AUTH token for any request
http.interceptors.request.use(function (config) {
  let token;
  if (isAdmin()) {
    token = localStorage.getItem('admininfo');
  } else {
    token = localStorage.getItem('userinfo');
    console.log(token);
  }
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.data.error.includes('Token Expired')) {
      forceLogout();
    }
    return Promise.reject(error);
  }
);

const forceLogout = () => {
  localStorage.clear();
  setTimeout(() => {
    window.location.reload();
  }, 2500);
};

export default http;
