import { API } from '../config';
import axios from 'axios';
import queryString from 'query-string';

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

export const getFilteredArt = (skip, limit, filters = {}) => {
  try {
    const data = { skip, limit, filters };
    return axios.post(`${API}/arts/by/search`, data);
  } catch (err) {
    console.log(err);
  }
};

export const list = params => {
  try {
    const query = queryString.stringify(params);
    return axios.get(`${API}/arts/search?${query}`);
  } catch (err) {
    console.log(err);
  }
};

export const read = artId => {
  try {
    return axios.get(`${API}/art/${artId}`);
  } catch (err) {
    console.log(err);
  }
};

export const listRelated = artId => {
  try {
    return axios.get(`${API}/arts/related/${artId}`);
  } catch (err) {
    console.log(err);
  }
};
