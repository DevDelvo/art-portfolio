import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

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
    setError('');
    setSuccess(false);
  };

  const newCategoryForm = () => (
    <form>
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
      <button className="btn btn-outline-primary" onSubmit={handleSubmit}>
        Create Category
      </button>
    </form>
  );
  return (
    <Layout
      title="Add new category."
      description={`Hello ${name}, let's add a new category!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newCategoryForm()}</div>
      </div>
    </Layout>
  );
};

export default AddCategory;
