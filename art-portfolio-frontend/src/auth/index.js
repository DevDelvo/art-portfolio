import { API } from '../config';
import axios from 'axios';

export const signup = user => {
  try {
    return axios.post(`${API}/signup`, user); //only returning the promise because we handle the promise in our handleSubmit functions in our react components
  } catch (err) {
    console.log(err);
  }
};

export const signin = async user => {
  try {
    // return axios.post(`${API}/signin`, user);
    // REFACTOR
    let res = await axios.post(`${API}/signin`, user);
    const { data } = res;
    return data;
  } catch (err) {
    // console.log(err);
    // REFACTOR
    return err;
  }
};

export const authenticate = (data, next) => {
  // if (typeof window !== 'undefined') {
  //   // console.log(data.data)
  //   localStorage.setItem('jwt', JSON.stringify(data.data));
  //   next();
  // }
  // REFACTOR
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
      return axios.get(`${API}/signout`);
    }
  } catch (err) {
    console.log(err);
  }
};

export const isAuthenticated = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};
