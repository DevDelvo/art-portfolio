import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import ArtCard from './ArtCard';
import { getCart } from './cartHelper';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
    return;
  }, [items]);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((item, idx) => (
          <ArtCard
            key={idx}
            art={item}
            showCartButton={false}
            cartUpdate={true}
            showRemoveButton={true}
          />
        ))}
      </div>
    );
  };

  const noItems = () => (
    <h2>
      Your cart is empty.
      <br />
      <Link to="/shop">Continue shopping</Link>
    </h2>
  );
  return (
    <Layout
      title="Cart"
      description="Manage cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItems()}
        </div>
        <div className="col-6">
          <p>show checkout options/shipping address/total/update quantity</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;