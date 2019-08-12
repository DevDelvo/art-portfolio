import { API } from '../config';
import axios from 'axios';

export const createCategory = (userId, token, category) => {
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  console.log(authOptions);
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
