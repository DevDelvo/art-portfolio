import { API } from '../config';
import axios from 'axios';

export const createCategory = (userId, token, category) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.post(
      `${API}/category/create/${userId}`,
      category,
      authOptions
    ); //only returning the promise because we handle the promise in our handleSubmit functions in our react components
  } catch (err) {
    console.log(err);
  }
};

export const createArt = (userId, token, art) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.post(`${API}/art/create/${userId}`, art, authOptions); //only returning the promise because we handle the promise in our handleSubmit functions in our react components
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = () => {
  try {
    return axios.get(`${API}/categories`);
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = (userId, token) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.get(`${API}/order/list/${userId}`, authOptions);
  } catch (err) {
    console.log(err);
  }
};

export const getStatusValues = (userId, token) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.get(`${API}/order/status-values/${userId}`, authOptions);
  } catch (err) {
    console.log(err);
  }
};
