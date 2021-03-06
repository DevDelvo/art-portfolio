import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelper';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs navbar-bg">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, '/')} to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, '/shop')}
            to="/shop"
          >
            Shop
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, '/cart')}
            to="/cart"
          >
            Cart{' '}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, '/admin/dashboard')}
                to="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, '/user/dashboard')}
                to="/user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </Fragment>
        )}

        <div className="spacer"></div>

        <ul className="nav">
      {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item navbar-right">
              <Link
                className="nav-link navbar-right"
                style={isActive(history, '/signup')}
                to="/signup"
              >
                Signup
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, '/signin')}
                to="/signin"
              >
                Signin
              </Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: 'pointer', color: '#ffffff' }}
              onClick={() =>
                signout(() => {
                  history.push('/');
                })
              }
            >
              Signout
            </span>
          </li>
        )}
      </ul>
      </ul>
    </div>
  );
};

export default withRouter(Menu);
// checked
