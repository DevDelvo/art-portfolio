import { API } from '../config';
import axios from 'axios';
import queryString from 'query-string';

export const CancelToken = axios.CancelToken;
export const source = CancelToken.source();

export const getArts = async sortBy => {
  // try {
  //   return axios.get(`${API}/arts?sortBy=${sortBy}&order=desc&limit=6`);
  // } catch (err) {
  //   console.log(err);
  // }
  // REFACTOR
  try {
    let res = await axios.get(
      `${API}/arts?sortBy=${sortBy}&order=desc&limit=6`,
      { cancelToken: source.token }
    );
    // const { data } = res;
    // console.log(res);
    return res;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log(err);
    } else {
      return err;
    }
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
    let res = await axios.get(`${API}/categories`, {
      cancelToken: source.token
    });
    const { data } = res;
    return data;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('is cancelled');
    } else {
      return err;
    }
  }
};

export const getFilteredArt = async (skip, limit, filters = {}) => {
  // try {
  //   const data = { skip, limit, filters };
  //   return axios.post(`${API}/arts/by/search`, data);
  // } catch (err) {
  //   console.log(err);
  // }
  // REFACTOR
  try {
    const data = { skip, limit, filters };
    let res = await axios.post(`${API}/arts/by/search`, data);
    return res;
  } catch (err) {
    return err;
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

export const processPayment = (userId, token, data) => {
  try {
    const authOptions = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return axios.post(`${API}/braintree/payment/${userId}`, data, authOptions);
  } catch (err) {
    console.log(err);
  }
};
