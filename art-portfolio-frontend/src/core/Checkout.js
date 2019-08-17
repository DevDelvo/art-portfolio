import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import ArtCard from './ArtCard';
import { isAuthenticated } from '../auth';

const Checkout = ({ cart }) => {
  console.log(cart);
  const getTotal = cart => {
    return cart.reduce((acc, curr) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Checkout</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  return (
    <div>
      <h2>Total: {getTotal(cart)}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
