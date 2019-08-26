import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getOrders } from './adminHelper';

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
    console.log(user, token);
    try {
      const res = await getOrders(user._id, token);
      const { data } = res;
      setOrders(data);
    } catch (err) {
      const res = err.response;
      console.log(res.data.error);
    }
  };

  const noOrders = orders => {
    return orders.length < 1 ? <h4>No Orders</h4> : null;
  };

  return (
    <Layout title="Orders" description="Manage your orders here.">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {noOrders(orders)}
          {JSON.stringify(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
