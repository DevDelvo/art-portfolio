import { API } from '../config';
import axios from 'axios';

export const getArts = sortBy => {
  try {
    return axios.get(`${API}/arts?sortBy=${sortBy}&order=desc&limit=6`);
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
