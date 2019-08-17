import { API } from '../config';
import axios from 'axios';
import queryString from 'query-string';

export const getArts = async sortBy => {
  // try {
  //   return axios.get(`${API}/arts?sortBy=${sortBy}&order=desc&limit=6`);
  // } catch (err) {
  //   console.log(err);
  // }
  // REFACTOR
  try {
    let res = await axios.get(
      `${API}/arts?sortBy=${sortBy}&order=desc&limit=6`
    );
    const { data } = res;
    return data;
  } catch (err) {
    return err;
  }
};

export const getCategories = async () => {
  // try {
  //   return axios.get(`${API}/categories`);
  // } catch (err) {
  //   console.log(err);
  // }
  // REFACTOR
  try {
    let res = await axios.get(`${API}/categories`);
    const { data } = res;
    return data;
  } catch (err) {
    return err;
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

export const getBraintreeClientToken = (userId, token) => {
  try {
    const authOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios.get(`${API}/braintree/getToken/${userId}`, authOptions);
  } catch (err) {
    console.log(err);
  }
};
// POSSIBLY
