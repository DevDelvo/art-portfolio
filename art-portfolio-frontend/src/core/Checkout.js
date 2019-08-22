import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { getBraintreeClientToken, processPayment } from './coreHelper';
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
    let cancel = false;
    async function fetchToken() {
      getToken(userId, token);
      if (!cancel) {
        console.log(state.clientToken);
      }
    }
    fetchToken();
    return () => (cancel = true);
  }, []);

  const getTotal = cart => {
    return cart.reduce((acc, curr) => {
      return acc + curr.count * curr.price;
    }, 0);
  };

  const handlePayment = () => {
    let nonce;
    let getNonce = state.instance
      .requestPaymentMethod()
      .then(data => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(cart)
        };
        processPayment(userId, token, paymentData)
          .then(res => {
            console.log(res);
            setState({ ...data, success: res.data.success });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        setState({ ...state, error: err.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setState({ ...state, error: '' })}>
      {state.clientToken !== null && cart.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: state.clientToken
            }}
            onInstance={instance => (state.instance = instance)}
          />
          <button onClick={handlePayment} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = error => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };

  const showSuccess = success => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? '' : 'none' }}
      >
        Thank you! Your payment was successful!
      </div>
    );
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
  return (
    <div>
      {showSuccess(state.success)}
      {showError(state.error)}
      <h2>Total: {getTotal(cart)}</h2>
      {showCheckout()}
    </div>
  );
};

export default Checkout;
// checked
