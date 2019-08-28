import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser, updateUserLocalStorage } from './userHelper';

const Profile = ({ match }) => {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    loading: false,
  });

  const { name, email, password, error, success, loading } = state;

  const { user, token } = isAuthenticated();

  useEffect(() => {
    let loadedData = false;
    function loadData() {
      init(match.params.userId)
      if (loadedData) {
        console.log('user profile loaded')
      }
    }
    loadData()
    return () => loadedData = true;
  }, [])

  const init = async (userId) => {
    setState({ ...state, loading: true })
    try {
      let res = await getUser(userId, token);
      const { data } = res;
      setState({ ...state, name: data.name, email: data.email, loading: false })
    } catch (err) {
      setState({ ...state, error: err, loading: false })
    }
  }

  const handleChange = name => e => {
    console.log(e.target.value)
    setState({ ...state, error: false, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ ...state, loading: true })
    try {
      let res = await updateUser(match.params.userId, token, { name, email, password })
      const { data } = res;
      console.log(data)
      updateUserLocalStorage(data, () => {
        setState({ ...state, name: data.name, email: data.email, loading: false, success: true })
      })
    } catch (err) {
      setState({ ...state, error: err, loading: true })
    }
  }

  const renderUpdateProfileForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="email" className="form-control" onChange={handleChange('email')} value={email} />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input type="password" className="form-control" onChange={handleChange('password')} value={password} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
    </form>
  )

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const showLoading = () => loading && <h2>Loading...</h2>;
  const showError = (error) => error && <h2>{error}...</h2>;
  return (
    <Layout
      title="Profile"
      description={`Hello ${user.name}, you can edit your profile here.`}
      className="container fluid"
    >
      <h2 className="mb-4">Profile Update</h2>
      {redirectUser(success)}
      {showError(error)}
      {loading ? showLoading() : renderUpdateProfileForm(name, email, password)}
    </Layout>
  );
};

export default Profile;
