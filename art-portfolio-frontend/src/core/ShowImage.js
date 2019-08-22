import React from 'react';
import { API } from '../config';

const ShowImage = ({ art, url }) => (
  <div className="product-img">
    <img
      src={`${API}/${url}/photo/${art._id}`}
      alt={art.name}
      className="mb-3"
      style={{ maxHeight: '75%', maxWidth: '75%' }}
    />
  </div>
);

export default ShowImage;
// checked
