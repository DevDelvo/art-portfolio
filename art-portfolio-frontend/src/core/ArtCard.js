import React, { useState } from 'react';
import ShowImage from './ShowImage';
import { Link, Redirect } from 'react-router-dom';
import moment from 'moment';

import { addItem, updateItem, removeItem, isInCart } from './cartHelper';

const ArtCard = ({
  art,
  showViewArtButton = true,
  showCartButton = true,
  cartUpdate = false,
  showRemoveButton = false
}) => {
  const [count, setCount] = useState(art.count);
  const [redirect, setRedirect] = useState(false);

  const { _id, name, description, price, category, quantity, createdAt } = art;

  // const addToCart = art => e => {
  //   console.log(art);
  //   addItem(art, () => {
  //     setRedirect(true);
  //   });
  // };
  const addToCart = () => {
    addItem(art, () => {
      setRedirect(true);
    });
  };

  const removeFromCart = artId => {
    removeItem(artId);
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
    );
  };
  const showViewButton = showViewArtButton =>
    showViewArtButton && (
      <Link to={`/art/${_id}`}>
        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View Art
        </button>
      </Link>
    );

  const showAddToCartButton = showCartButton =>
    // !isInCart(_id) &&
    showCartButton && (
      <Link to="/">
        <button
          className="btn btn-outline-warning mt-2 mb-2"
          // onClick={addToCart(art)}
          onClick={() => addToCart(art)}
        >
          Add to Cart
        </button>
      </Link>
    );

  const showRemoveFromCartButton = showRemoveButton =>
    showRemoveButton && (
      <button
        className="btn btn-outline-danger mt-2 mb-2"
        onClick={() => removeFromCart(_id)}
      >
        Remove from Cart
      </button>
    );

  const handleQuantity = artId => e => {
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1) {
      updateItem(artId, e.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleQuantity(_id)}
            />
          </div>
        </div>
      )
    );
  };
  const handleRedirect = () => {
    if (redirect) return <Redirect to="/cart" />;
  };

  return (
    <div className="card">
      <div className="card-header name">{name}</div>
      <ShowImage art={art} url="arts" />
      <div className="card-body">
        {handleRedirect(redirect)}
        <p>Description: {description.substring(0, 100)}</p>
        <p className="black-10">${price}</p>
        <p className="black-9">{category && category.name}</p>
        <p className="black-8">Added {moment(createdAt).fromNow()}</p>
        {showStock(quantity)}
        <br />
        {showViewButton(showViewArtButton)}
        {showAddToCartButton(showCartButton)}
        {showRemoveFromCartButton(showRemoveButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default ArtCard;
