import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './adminHelper';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = e => {
    setError('');
    setName(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(name);
    setError('');
    setSuccess(false);
    console.log(name);
    createCategory(user._id, token, { name })
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
      return <h3 className="text-success">{name} has been created.</h3>;
    }
  };

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{name} should be unique.</h3>;
    }
  };

  const newCategoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          autoFocus
          onChange={handleChange}
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
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
