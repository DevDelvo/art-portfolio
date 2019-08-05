import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { API } from '../config';

const Signup = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    const handleChange = name => e => {
        setState({ ...state, error: false, [name]: e.target.value })
    }

    const signup = async (user) => {
        console.log(user)
        try {
            let res = await axios.post(`${API}/signup`, user);
            let { data } = res;
            console.log(data)
        } catch (err) {
            console.log(err)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = state;
        const user = {name, email, password}
        // console.log(user)
        signup(user);
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="name" className="form-control" onChange={handleChange('name')} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control" onChange={handleChange('password')} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )


    return(
        <Layout title="Signup" description="Signup page"  className="container col-md-8 offset-md-2">
            {signupForm()}
        </Layout>
    )
}

export default Signup;