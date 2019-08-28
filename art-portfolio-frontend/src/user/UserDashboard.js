import React from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const Dashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated();

    const renderUserLinks = () => (
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">My cart</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                </li>
            </ul>
        </div>
    )

    const renderUserInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered User'}</li>
            </ul>
        </div>
    )

    const renderPurchaseHistory = () => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">history</li>
            </ul>
        </div>
    )

    return (
        <Layout title="User Dashboard" description={`Welcome back ${name}!`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {renderUserLinks()}
                </div>
                <div className="col-9">
                    {renderUserInfo()}
                    {renderPurchaseHistory()}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;