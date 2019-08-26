import React from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role }
  } = isAuthenticated();

  const renderAdminLinks = () => (
    <div className="card">
      <h4 className="card-header">Admin Links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/create/category">
            Add Category
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/create/art">
            Add Art
          </Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/admin/orders">
            View Orders
          </Link>
        </li>
      </ul>
    </div>
  );

  const renderAdminInfo = () => (
    <div className="card mb-5">
      <h3 className="card-header">Admin Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">Admin</li>
      </ul>
    </div>
  );

  return (
    <Layout
      title="Admin Dashboard"
      description={`Welcome back ${name}!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{renderAdminLinks()}</div>
        <div className="col-9">{renderAdminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
