import { error, success } from '../toaster';
import http from './http';

export const signup = async (user) => {
  try {
    const response = await http
      .post(`api/users/register`, user);
    success(response?.data?.message);
  } catch (err) {
    error(err.response?.data?.error);
  }
};

export const signIn = async (user) => {
  try {
    const response = await http
      .post(`api/users/login`, user);
    success(response?.data?.message);
    authenticate(response?.data?.token, () => {
      window.location.reload();
      console.log("wow beautiful p");
    });
  } catch (err) {
    error(err.response?.data?.error);
  }
};

export const authenticate = (data, next = () => {}) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userinfo', data);
   
  }
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('userinfo')) {
    return localStorage.getItem('userinfo');
  } else {
    return false;
  }
};

