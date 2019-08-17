import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { source, getCategories, getFilteredArt } from './coreHelper';
import { prices } from './fixedPrices';

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  });
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    init();
    loadFilteredArt(skip, limit, myFilters.filters);
    // return () => source.cancel();
  }, []);

  const init = async () => {
    // getCategories()
    //   .then(data => {
    //     setCategories(data.data);
    //   })
    //   .catch(err => {
    //     const res = err.response;
    //     setError(res.data.error);
    //   });
    // REFACTOR
    let data = await getCategories();
    if (data.response) {
      setError(data.response.data.error);
    } else {
      setCategories(data);
    }
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === 'price') {
      let priceRange = handlePriceRange(filters);
      newFilters.filters[filterBy] = priceRange;
    }
    loadFilteredArt(myFilters.filters);
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

  const loadFilteredArt = async newFilters => {
    // getFilteredArt(skip, limit, newFilters)
    //   .then(data => {
    //     setFilteredResults(data.data.data);
    //     setSize(data.data.size);
    //     setSkip(0);
    //   })
    //   .catch(err => {
    //     const res = err.response;
    //     setError(res.data.error);
    //   });
    // REFACTOR
    let res = await getFilteredArt(skip, limit, newFilters);
    const { data } = res;
    if (data.response) {
      setError(data.response.data.error);
    } else {
      setFilteredResults(data.data);
      setSize(data.size);
      setSkip(0);
    }
  };

  const loadMoreArt = async () => {
    let toSkip = skip + limit;
    // getFilteredArt(toSkip, limit, myFilters.filters) // set toSkip to skip over the things we've already seen
    //   .then(data => {
    //     setFilteredResults([...filteredResults, ...data.data.data]);
    //     setSize(data.size);
    //     setSkip(toSkip);
    //   })
    //   .catch(err => {
    //     const res = err.response;
    //     setError(res.data.error);
    //   });
    // REFACTOR
    let res = await getFilteredArt(toSkip, limit, myFilters.filters);
    const { data } = res;
    if (data.response) {
      setError(data.response.data.error);
    } else {
      setFilteredResults([...filteredResults, ...data.data]);
      setSize(data.size);
      setSkip(toSkip);
    }
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button className="btn btn-warning mb-5" onClick={loadMoreArt}>
          Load more
        </button>
      )
    );
  };

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
            <Checkbox
              categories={categories}
              handleFilters={filters => handleFilters(filters, 'category')}
            />
          </ul>
          <h4>Filter by Price Range</h4>
          <RadioBox
            prices={prices}
            handleFilters={filters => handleFilters(filters, 'price')}
          />
        </div>
        <div className="col-8">
          <h2 className="mb-4">Art</h2>
          <div className="row">
            {filteredResults.map((art, idx) => (
              <div key={idx} className="col-4 mb-3">
                <ArtCard art={art} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
// checked
// double checked
