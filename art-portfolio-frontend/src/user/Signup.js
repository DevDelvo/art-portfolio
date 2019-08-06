import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signup } from '../auth'

const Signup = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
    });

    const {name, email, password, error, success} = state;

    const handleChange = name => e => {
        setState({ ...state, error: false, [name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {name, email: email.toLowerCase(), password}
        signup(user)
        .then(() => {
            setState({
                ...state,
                name: '',
                email: '',
                password: '',
                error: '',
                success: true,
            })
        })
        .catch(error => {
            let res = error.response;
            console.log(res)
            setState({...state, error: res.data.error, success: false})
        })
        ;
    }

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="name"
                    className="form-control"
                    onChange={handleChange('name')}
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    className="form-control"
                    onChange={handleChange('email')}
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    type="password"
                    className="form-control"
                    onChange={handleChange('password')}
                    value={password}
                />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            New account created! Thank you for signing up!
        </div>
    )

    return(
        <Layout title="Signup" description="Signup page"  className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signupForm()}
        </Layout>
    )
}

export default Signup;