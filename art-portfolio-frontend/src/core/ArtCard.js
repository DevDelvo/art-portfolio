import React from 'react';
import { Link } from 'react-router-dom';

const ArtCard = ({ art }) => {
  const { name, description, price, createdAt } = art;
  console.log(createdAt);
  console.log();
  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{name}</div>
        <div className="card-body">
          <p>Description: {description}</p>
          <p>Price: ${price}</p>
          <Link to="/">
            <button className="btn btn-outline-primary mt-2 mb-2">
              View Art
            </button>
          </Link>
          <Link to="/">
            <button className="btn btn-outline-warning mt-2 mb-2">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArtCard;
