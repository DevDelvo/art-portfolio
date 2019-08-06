import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate } from '../auth';

const Signin = () => {
    const [state, setState] = useState({
        email: 'kevinbdelvo@gmail.com',
        password: 'password1',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });

    const { email, password, error, loading, redirectToReferrer } = state;

    const handleChange = name => e => {
        setState({ ...state, error: false, [name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setState({ ...state, error: false, loading: true })
        const user = {email: email.toLowerCase(), password};
        signin(user)
        .then((data) => {
            // setState({...state, redirectToReferrer: true, loading: false})
            authenticate(data, () => {
                setState({ ...state, redirectToReferrer: true })
            })
        })
        .catch(err => {
            let res = err.response
            setState({...state, error: res.data.error, loading: false})
        })
    }

    const signinForm = () => (
        <form>
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

    const showLoading = () => (
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        )
    )

    const redirectUser = () => {
        if (redirectToReferrer) {
            return <Redirect to="/" />
        }
    }

    return(
        <Layout title="Signin" description="Signin page" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {signinForm()}
            {redirectUser()}
        </Layout>
    )
}

export default Signin;