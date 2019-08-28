import { API } from '../config';
import axios from 'axios';


//  CATEGORIES
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

export const getCategories = () => {
  try {
    return axios.get(`${API}/categories`);
  } catch (err) {
    console.log(err);
  }
};

// ORDERS

export const getOrders = async (userId, token) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    // return axios.get(`${API}/order/list/${userId}`, authOptions);
    let res = await axios.get(`${API}/order/list/${userId}`, authOptions);
    return res;
  } catch (err) {
    console.log(err);
    // return err;
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

export const updateOrderStatus = (userId, orderId, token, status) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let data = { status, orderId };

  try {
    return axios.put(
      `${API}/order/${orderId}/status/${userId}`,
      data,
      authOptions
    );
  } catch (err) {
    console.log(err);
  }
};

// ART CRUD

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

export const getArts = async () => {
  try {
    const res = await axios.get(`${API}/arts?limit=undefined`);
    const { data } = res;
    return data;
  } catch (err) {
    console.log(err)
  }
}

export const getSingleArt = async (artId) => {
  try {
    let res = await axios.get(`${API}/art/${artId}`);
    return res;
  } catch (err) {
    console.log(err)
  }
}

export const updateArt = async (artId, userId, token, data) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    return axios.put(`${API}/art/${artId}/${userId}`, data, authOptions);
  } catch (err) {
    console.log(err);
    // return err;
  }
}

export const deleteArt = async (artId, userId, token) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    let res = await axios.delete(`${API}/art/${artId}/${userId}`, authOptions);
    console.log(res)
    return res;
  } catch (err) {
    console.log(err.response)
  }
}