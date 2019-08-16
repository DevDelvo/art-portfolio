import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = cid => () => {
    const currentCategoryId = checked.indexOf(cid); //returns first index or -1
    const filters = [...checked]; //gives all categories in the state
    if (currentCategoryId === -1) {
      filters.push(cid);
    } else {
      filters.splice(currentCategoryId, 1);
    }
    setChecked(filters);
    handleFilters(filters, 'category');
  };

  return categories.map((category, idx) => {
    const { _id, name } = category;
    return (
      <li key={idx} className="list-unstyled">
        <input
          type="checkbox"
          value={checked.indexOf(_id === -1)}
          className="form-check-input"
          onChange={handleToggle(_id)}
        />
        <label className="form-check-label">{name}</label>
      </li>
    );
  });
};

export default Checkbox;
