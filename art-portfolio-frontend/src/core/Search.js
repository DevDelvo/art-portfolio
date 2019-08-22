import React, { useState, useEffect } from 'react';
import ArtCard from './ArtCard';
import { getCategories, list } from './coreHelper';

const Search = () => {
  const [state, setState] = useState({
    categories: [],
    category: 'All',
    search: '',
    searched: false,
    results: []
  });
  // const [error, setError] = useState(false);

  const { categories, category, search, searched, results } = state;

  useEffect(() => {
    let cancel = false;
    async function fetchCategories() {
      loadCategories();
      if (!cancel) {
        console.log('Categories fetched in Search.');
      }
    }
    fetchCategories();
    return () => (cancel = true);
  }, []);

  const loadCategories = async () => {
    // getCategories()
    //   .then(data => {
    //     setState({ ...state, categories: data.data });
    //   })
    //   .catch(err => {
    //     const res = err.response;
    //     // setError(res.data.error);
    //     console.log(res.data.error);
    //   });
    // REFACTOR
    let data = await getCategories();
    if (data.response) {
      console.log(data.response.data.error);
    } else {
      setState({ ...state, categories: data });
    }
  };

  // const showError = () => (
  //   <div
  //     className="alert alert-danger"
  //     style={{ display: error ? '' : 'none' }}
  //   >
  //     {error}
  //   </div>
  // );

  const handleChange = name => e => {
    setState({ ...state, [name]: e.target.value, searched: false });
  };

  const searchSubmit = e => {
    e.preventDefault();
    searchArt();
  };

  const searchArt = () => {
    if (search) {
      list({ search: search || undefined, category: category })
        .then(data => {
          setState({ ...state, results: data.data, searched: true });
        })
        .catch(err => {
          const res = err.response;
          // setError(res.data.error);
          console.log(res.data.error);
        });
    }
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} items.`;
    }
    if (searched && results.length < 1) {
      return 'No items found matching that search.';
    }
  };

  const searchedArt = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((art, idx) => (
            <div key={idx} className="col-4 mb-3">
              <ArtCard art={art} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange('category')}>
              <option value="All">All</option>
              {categories.map((category, idx) => {
                const { _id, name } = category;
                return (
                  <option key={idx} value={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange('search')}
            placeholder="Search by name."
          />
        </div>
        <div className="btn input-group-append" style={{ border: 'none' }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      {/* {showError()} */}
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedArt(results)}</div>
    </div>
  );
};

export default Search;
// checked
// double checked.
