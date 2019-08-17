import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken } from './coreHelper';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ cart }) => {
  const [state, setState] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token)
      .then(data => {
        setState({ ...state, clientToken: data.data.clientToken });
      })
      .catch(err => {
        const res = err.response;
        setState({ ...state, error: res.data.error });
      });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return cart.reduce((acc, curr) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to Checkout</button>
      </Link>
    );
  };

  const showDropIn = () => (
    <div>
      {state.clientToken !== null && cart.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: state.clientToken
            }}
            onInstance={instance => (state.instance = instance)}
          />
          <button className="btn btn-success">Checkout</button>
        </div>
      ) : null}
    </div>
  );

  return (
    <div>
      <h2>Total: {getTotal()}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
// checked
