import { API } from '../config';
import axios from 'axios';

export const getUser = (userId, token) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.get(`${API}/user/${userId}`, authOptions);
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = (userId, token, user) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.put(`${API}/user/${userId}`, user, authOptions);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserLocalStorage = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      let auth = JSON.parse(localStorage.getItem('jwt'));
      auth.user = user;
      localStorage.setItem('jwt', JSON.stringify(auth));
      next();
    }
  }
};
