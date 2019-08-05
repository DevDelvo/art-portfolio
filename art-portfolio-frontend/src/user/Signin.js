import React, { useState } from 'react';
import Layout from '../core/Layout';

const Signin = () => {
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

    const handleSubmit = e => {
        
    }

    const signUpForm = () => (
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
            <button className="btn btn-primary">Submit</button>
        </form>
    )

    return(
        <Layout title="Signin" description="Signin page" className="container col-md-8 offset-md-2">
            {signUpForm()}
            {JSON.stringify(state)}
        </Layout>
    )
}

export default Signin;