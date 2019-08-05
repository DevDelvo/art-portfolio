import React from 'react';
import Layout from '../core/Layout';
import { API } from '../config';

const Signup = () => {
    return(
        <Layout title="Signup" description="Signup page">
            {API}
        </Layout>
    )
}

export default Signup;