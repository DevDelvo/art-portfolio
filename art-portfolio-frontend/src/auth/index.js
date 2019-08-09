import { API } from '../config';
import axios from 'axios'

export const signup = (user) => {
    try {
        return axios.post(`${API}/signup`, user);
    } catch (err) {
        console.log(err);
    }
}

export const signin = (user) => {
    try {
        return axios.post(`${API}/signin`, user);
    } catch (err) {
        console.log(err);
    }
}

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}

export const signout = (next) => {
    try {
        if (typeof window !== "undefined") {
            localStorage.removeItem('jwt');
            next();
            return axios.get(`${API}/signout`);
        }
    } catch(err) {
        console.log(err);
    }
}

export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        // return true;
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}