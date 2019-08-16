import React, { useState, Fragment } from 'react';

const Checkbox = ({ prices, handleFilters }) => {
  const [price, setPrice] = useState(0);

  const handleChange = e => {
    const {
      target: { value }
    } = e;
    handleFilters(value);
    setPrice(value);
  };

  return prices.map((price, idx) => {
    const { _id, name } = price;
    return (
      <div key={idx}>
        <input
          name={price}
          type="radio"
          className="mr-2 ml-4"
          onChange={handleChange}
          value={`${_id}`}
        />
        <label className="form-check-label">{name}</label>
      </div>
    );
  });
};

export default Checkbox;
