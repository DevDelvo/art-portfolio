import { API } from '../config';
import axios from 'axios'

export const signup = (user) => {
    try {
        return axios.post(`${API}/signup`, user);
    } catch (err) {
        console.log(err)
    }
}