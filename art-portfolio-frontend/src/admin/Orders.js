import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getOrders } from './adminHelper';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    let loaded = false;
    function fetchUsers() {
      loadOrders(user, token);
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
                  <li className="list-group-item">Status: {order.status}</li>
                  <li className="list-group-item">
                    Transaction Id: {order.transaction_id}
                  </li>
                  <li className="list-group-item">Amount: {order.amount}</li>
                  <li className="list-group-item">
                    Ordered by: {order.user.name}
                  </li>
                  <li className="list-group-item">
                    Ordered on: {moment(order.created_at).fromNow()}
                  </li>
                  <li className="list-group-item">Address: {order.address}</li>
                </ul>
                <h3 className="mt-mb-4 font-italic">
                  Total products ordered: {order.products.length}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
