import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getUser, updateUser, updateUserLocalStorage } from './userHelper';

const Profile = () => {
  const [userData, setUserData] = useState({});

  const { user, token } = isAuthenticated();

  const fetchUser = async (userId, token) => {
    try {
      const res = await getUser(userId, token);
      const { data } = res;
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updatedUser = async (userId, token, user) => {
    try {
      const res = await updateUser(userId, token, user);
      const { data } = res;
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout
      title="Profile"
      description={`Hello ${user.name}, you can edit your profile here.`}
    ></Layout>
  );
};

export default Profile;
