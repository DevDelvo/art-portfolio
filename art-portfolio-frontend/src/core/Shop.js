import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import Checkbox from './Checkbox';
import Radiobox from './Radiobox';
import { getArts, getCategories } from './coreHelper';
import { prices } from './fixedPrices';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [error, setError] = useState(false);

  const init = () => {
    getCategories()
      .then(data => {
        setCategories(data.data);
      })
      .catch(err => {
        const res = err.response;
        setError(res.data.error);
      });
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === 'price') {
      let priceRange = handlePriceRange(filters);
      newFilters.filters[filterBy] = priceRange;
    }
    setMyFilters(myFilters);
  };

  const handlePriceRange = filters => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(filters)) {
        array = data[key].array;
      }
    }
    return array;
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout
      title="Shop Page"
      description="Welcome to Kevin Delvo's Art website!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filter by Categories</h4>
          <ul>
            {
              <Checkbox
                categories={categories}
                handleFilters={filters => handleFilters(filters, 'category')}
              />
            }
          </ul>
          <div className="col-8">
            <h4>Filter by Price Range</h4>
            {JSON.stringify(myFilters)}
            <Radiobox
              prices={prices}
              handleFilters={filters => handleFilters(filters, 'price')}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
