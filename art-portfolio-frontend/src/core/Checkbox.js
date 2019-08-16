import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = cid => () => {
    console.log(checked);
    const currentCategoryId = checked.indexOf(cid); //returns first index or -1
    console.log(currentCategoryId);
    const newCheckedCategoryId = [...checked]; //gives all categories in the state
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(cid);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
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
