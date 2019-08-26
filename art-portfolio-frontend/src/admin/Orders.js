import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getOrders, getStatusValues, updateOrderStatus } from './adminHelper';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    let loaded = false;
    function fetchUsers() {
      loadOrders(user, token);
      loadStatusValues(user, token);
      if (loaded) {
        console.log(`Orders loaded.`);
      }
    }
    fetchUsers();
    return () => {
      loaded = true;
    };
  }, []);

  const loadOrders = async (user, token) => {
    try {
      const res = await getOrders(user._id, token);
      const { data } = res;
      setOrders(data);
    } catch (err) {
      const res = err.response;
      console.log(res.data.error);
    }
  };

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger">No orders.</h1>;
    }
  };

  const loadStatusValues = async (user, token) => {
    try {
      const res = await getStatusValues(user._id, token);
      const { data } = res;
      // console.log(res);
      setStatusValues(data);
    } catch (err) {
      const res = err.response;
      console.log(res.data.error);
    }
  };

  const showStatus = order => {
    return (
      <div className="form-group">
        <h3 className="mark mb-4">Status: {order.status}</h3>
        <select
          className="form-control"
          onChange={e => handleStatusChange(e, order._id)}
        >
          <option>Update Status</option>

          {statusValues.map((status, idx) => {
            return (
              <option value={status} key={idx}>
                {status}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const handleStatusChange = async (e, orderId) => {
    try {
      await updateOrderStatus(user._id, orderId, token, e.target.value);
      loadOrders(user, token);
    } catch (err) {
      console.log(err);
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" value={value} className="form-control" readOnly />
      </div>
    );
  };

  return (
    <Layout title="Orders" description="Manage your orders here.">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((order, idx) => {
            return (
              <div
                className="mt-5"
                key={idx}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID: {order._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">
                    Status: {showStatus(order)}
                  </li>
                  <li className="list-group-item">
                    Transaction Id: {order.transaction_id}
                  </li>
                  <li className="list-group-item">
                    Total Cost: ${order.amount}
                  </li>
                  <li className="list-group-item">
                    Ordered by: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    {/* Ordered: {moment(order.createdAt).fromNow()} */}
                    Ordered: {moment(order.createdAt).format('DD-MM-YYYY')} (
                    {moment(order.createdAt).fromNow()})
                  </li>
                  <li className="list-group-item">Address: {order.address}</li>
                </ul>
                <h3 className="mt-mb-4 font-italic">
                  Total products ordered: {order.products.length}
                </h3>

                {order.products.map((product, idx) => {
                  return (
                    <div
                      className="mb-4"
                      key={idx}
                      style={{ padding: '20px', border: '1px solid indigo' }}
                    >
                      {showInput('Art Name', product.name)}
                      {showInput('Price', product.price)}
                      {showInput('Total', product.count)}
                      {showInput('Product Id', product._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
