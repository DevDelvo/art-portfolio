import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { getSingleArt, getCategories, updateArt } from './adminHelper';
import { API } from '../config';

const UpdateArt = ({ match }) => {
  const [state, setState] = useState({
    name: '',
    description: '',
    file: '',
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
    file,
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

  const { user, token } = isAuthenticated();

  useEffect(() => {
    init(match.params.artId);
  }, []);

  const initCategories = (data) => {
    const {
      _id,
      name,
      description,
      price,
      category,
      shipping,
      quantity,
    } = data;
    getCategories()
      .then(categories => {
        setState({
          name,
          file: `${API}/arts/photo/${_id}`,
          price,
          description,
          category,
          categories: categories.data,
          shipping,
          quantity,
          formData: new FormData(),
          loading: false
        });
      })
      .catch(err => {
        const res = err.response;
        setState({ ...state, error: res, loading: false });
      });
  };

  const init = (artId) => {
    setState({ ...state, loading: true })
    getSingleArt(artId).then(data => {
      // const {
      //   _id,
      //   name,
      //   description,
      //   price,
      //   category,
      //   shipping,
      //   quantity,
      // } = data.data;

      // setState({
      //   ...state,
      //   name,
      //   description,
      //   price,
      //   shipping,
      //   quantity,
      //   formData: new FormData(),
      // })
      initCategories(data.data);
    }).catch(err => {
      const res = err.response;
      setState({ ...state, error: res, loading: false });
    })
  }

  const handleChange = name => e => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    if (name === 'photo') {
      // console.log(e.target.files)
      if (e.target.files[0]) {
        setState({ ...state, file: URL.createObjectURL(e.target.files[0]) })
      } else {
        setState({ ...state })
      }
    } else {
      setState({ ...state, [name]: value })
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state)
    setState({ ...state, error: '', loading: true });
    updateArt(match.params.artId, user._id, token, formData)
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
          redirectToProfile: true,
          formData: ''
        });
      })
      .catch(err => {
        const res = err.response;
        console.log('catch err', err.response);
        setState({ ...state, error: res.data.error, loading: false });
      });
  };

  const updateArtForm = () => (
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
          <img src={file} alt={description} style={{ maxHeight: '200px', maxWidth: '200px' }} />
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

      <button className="btn btn-outline-primary">Update art</button>
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
      <h2>{`${createdArt}`} was successfully updated!</h2>
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

  const redirectUser = () => {
    if (redirectToProfile) {
      return <Redirect to='/' />
    }
  }

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
          {updateArtForm()}
          {goBack()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateArt;
