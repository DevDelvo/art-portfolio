import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = (props) => {
    const { history } = props;
    return(
        <div>
            <ul className="nav nav-tabs bg-primary">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                </li>

                {
                    isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                            </li>
                        </Fragment>
                    )
                }
                {
                    isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">Dashboard</Link>
                            </li>
                        </Fragment>
                    )
                }

                { !isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin</Link>
                            </li>
                        </Fragment>
                    )
                }
                { isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{cursor: 'pointer', color: '#ffffff'}}
                            onClick={() => signout(() => {
                                history.push('/')
                            })}
                        >
                            Signout
                        </span>
                    </li>
                    )
                }
            </ul>
        </div>
    )
}

export default withRouter(Menu);