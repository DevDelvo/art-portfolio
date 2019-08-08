import { API } from '../config';
import axios from 'axios'

export const signup = async (user) => {
    try {
        let res = await axios.post(`${API}/signup`, user);
        const { data } = res;
        return data;
    } catch (err) {
        console.log(err);
    }
}

export const signin = async (user) => {
    try {
        let res = await axios.post(`${API}/signin`, user);
        const { data } = res;
        console.log(data)
        return data;
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

export const signout = async (next) => {
    try {
        if (typeof window !== "undefined") {
            localStorage.removeItem('jwt');
            next();
            let res = await axios.get(`${API}/signout`);
            const { data } = res;
            console.log(data)
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
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}