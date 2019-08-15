import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { createCategory } from './adminHelper';

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

  useEffect(() => {
    setState({ ...state, formData: new FormData() });
  }, []);

  const { user, token } = isAuthenticated();

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setState({ ...state, [name]: value });
  };

  const setArt = name => {};

  const handleSubmit = e => {
    e.preventDefault();
    // setError('');
    // setSuccess(false);
    // createCategory(user._id, token, { name: art })
    //   .then(data => {
    //     setError('');
    //     setSuccess(true);
    //   })
    //   .catch(err => {
    //     setError(true);
    //   });
  };

  // const showSuccess = () => {
  //   if (success) {
  //     return <h3 className="text-success">{} has been created.</h3>;
  //   }
  // };

  // const showError = () => {
  //   if (error) {
  //     return <h3 className="text-danger">{} should be unique.</h3>;
  //   }
  // };

  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-warning">
        Back to DashBoard
      </Link>
    </div>
  );

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
        ></input>
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select className="form-control" onChange={handleChange('category')}>
          <option value="5d25b62170678866e8fc5a62">Illustration</option>
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select className="form-control" onChange={handleChange('shipping')}>
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
        ></input>
      </div>

      <button className="btn btn-outline-primary">Upload art</button>
    </form>
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
          {newArtForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
