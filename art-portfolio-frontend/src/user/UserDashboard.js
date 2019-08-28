import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getPurchaseHistory } from './userHelper';
import ShowImage from '../core/ShowImage';
import moment from 'moment';

const Dashboard = () => {
    const [history, setHistory] = useState([]);

    const { user: { _id, name, email, role }, token } = isAuthenticated();

    useEffect(() => {
        let loaded = false;
        function loadData() {
            init();
            if (loaded) {
                console.log('History Loaded.')
            }
        }
        loadData();
        return () => loaded = true;
    }, [])

    const init = async () => {
        try {
            let res = await getPurchaseHistory(_id, token);
            const { data } = res;
            console.log(data)
            setHistory(data);
        } catch (err) {
            console.log(err)
        }
    }

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

    const renderPurchaseHistory = (history) => (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {
                        history.map((purchase, idx) => {
                            const { status, address, products, createdAt } = purchase;
                            return (
                                <div key={idx}>
                                    <hr />
                                    <h6>Status: {status}</h6>
                                    <h6>Shipping to: {address}</h6>
                                    <h6>Products:
                                        {
                                            products.map((product, idx) => {
                                                const { name, price } = product;
                                                return (
                                                    <div key={idx}>
                                                        <h8>Product name: {name}</h8><br />
                                                        <h8>Product price: {price}</h8><br />
                                                        <ShowImage art={product} url="arts" style={{ maxHeight: '150px', maxWidth: '150px' }} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </h6>
                                    <h6>Purchase date: {moment(createdAt).format('DD-MM-YYYY')}</h6>
                                </div>
                            )
                        })
                    }
                </li>
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
                    {renderPurchaseHistory(history)}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard;