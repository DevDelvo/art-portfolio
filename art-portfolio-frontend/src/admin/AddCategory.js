import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './adminHelper';

const AddCategory = () => {
  const [category, setCategory] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setCategory(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    createCategory(user._id, token, { name: category })
      .then(data => {
        setError('');
        setSuccess(true);
      })
      .catch(err => {
        setError(true);
      });
  };

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{category} has been created.</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{category} should be unique.</h3>;
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to DashBoard
      </Link>
    </div>
  );

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={category}
          autoFocus
          onChange={handleChange}
          required
        />
      </div>
      <button className="btn btn-outline-primary">Create Category</button>
    </form>
  );
  return (
    <Layout
      title="Add new category."
      description={`Hello ${
        user.name.split(' ')[0]
      }, let's add a new category!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
