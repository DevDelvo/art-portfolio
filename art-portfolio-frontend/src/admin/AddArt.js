import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getCategories, createArt } from './adminHelper';

const AddCategory = () => {
  const [state, setState] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: '',
    error: '',
    createdArt: '',
    redirectToProfile: false,
    formData: ''
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    loading,
    error,
    createdArt,
    redirectToProfile,
    formData
  } = state;

  const init = () => {
    getCategories()
      .then(data => {
        setState({ ...state, categories: data.data, formData: new FormData() });
      })
      .catch(err => {
        const res = err.response;
        setState({ ...state, error: res, loading: false });
      });
  };

  useEffect(() => {
    // setState({ ...state, formData: new FormData() });
    init();
  }, []);

  const { user, token } = isAuthenticated();

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setState({ ...state, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setState({ ...state, error: '', loading: true });
    createArt(user._id, token, formData)
      .then(data => {
        setState({
          ...state, // old state
          name: '',
          description: '',
          price: '',
          categories: [],
          category: '',
          shipping: '',
          quantity: '',
          photo: '',
          loading: false,
          error: '',
          createdArt: data.name,
          redirectToProfile: false,
          formData: ''
        });
      })
      .catch(err => {
        const res = err.response;
        console.log('catch err', res);
        setState({ ...state, error: res.data.error, loading: false });
      });
  };

  const newArtForm = () => (
    <form className="mb-3" onSubmit={handleSubmit}>
      <h4>Upload image (Must be smaller than 1MB)</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input
            type="file"
            name="photo" // name must match name in the create art function in backend.
            onChange={handleChange('photo')}
            accept="image/*"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange('name')}
          required
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={handleChange('description')}
        ></textarea>
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          type="number"
          className="form-control"
          value={price}
          onChange={handleChange('price')}
          required
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={handleChange('category')}>
          <option>Please select</option>
          {categories &&
            categories.map((category, idx) => (
              <option key={idx} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select className="form-control" onChange={handleChange('shipping')}>
          <option>Please select</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          onChange={handleChange('quantity')}
          required
        ></input>
      </div>

      <button className="btn btn-outline-primary">Upload art</button>
    </form>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdArt ? '' : 'none' }}
    >
      <h2>{`${createdArt}`} was successfully uploaded!</h2>
    </div>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to DashBoard
      </Link>
    </div>
  );

  return (
    <Layout
      title="Upload new art piece."
      description={`Hello ${
        user.name.split(' ')[0]
      }, let's add a new art piece to the store!`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newArtForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
