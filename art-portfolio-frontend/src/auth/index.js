import { API } from '../config';
import axios from 'axios'

export const signup = (user) => {
    try {
        return axios.post(`${API}/signup`, user);
    } catch (err) {
        console.log(err)
    }
}

export const signin = (user) => {
    try {
        return axios.post(`${API}/signin`, user);
    } catch (err) {
        console.log(err)
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}