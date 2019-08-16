import React from 'react';
import ShowImage from './ShowImage';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ArtCard = ({ art, showViewArtButton = true }) => {
  const { _id, name, description, price, category, quantity, createdAt } = art;

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of stock</span>
    );
  };
  const showViewButton = () =>
    showViewArtButton && (
      <Link to={`/art/${_id}`}>
        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View Art
        </button>
      </Link>
    );

  const showAddToCartButton = () => (
    <Link to="/">
      <button className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
    </Link>
  );

  return (
    <div className="card">
      <div className="card-header name">{name}</div>
      <ShowImage art={art} url="arts" />
      <div className="card-body">
        <p>Description: {description.substring(0, 100)}</p>
        <p className="black-10">${price}</p>
        <p className="black-9">{category && category.name}</p>
        <p className="black-8">Added {moment(createdAt).fromNow()}</p>
        {showStock(quantity)}
        <br />
        {showViewButton()}
        {showAddToCartButton()}
      </div>
    </div>
  );
};

export default ArtCard;
