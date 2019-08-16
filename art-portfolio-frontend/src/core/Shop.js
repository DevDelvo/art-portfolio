import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import Checkbox from './Checkbox';
import { getArts, getCategories } from './coreHelper';

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
    console.log('filters', newFilters);
    newFilters.filters[filterBy] = filters;
    console.log('filter by ', newFilters.filters[filterBy]);
    setMyFilters(myFilters);
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
        </div>
        <div className="col-8">{JSON.stringify(myFilters)}</div>
      </div>
    </Layout>
  );
};

export default Shop;
