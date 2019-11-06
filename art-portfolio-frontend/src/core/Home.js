import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import { CancelToken, source, getArts } from './coreHelper';
import Search from './Search';

const Home = () => {
  const [artBySell, setArtBySell] = useState([]);
  const [artByCreation, setArtByCreation] = useState([]);
  const [err, setError] = useState(false);
  const [loadingBySell, setLoadingBySell] = useState(false);
  const [loadingByCreated, setLoadingByCreated] = useState(false);

  const loadArtBySell = async () => {
    // getArts('sold')
    //   .then(data => {
    //     setArtBySell(data.data);
    //   })
    //   .catch(err => {
    //     const res = err.response;
    //     setError(res.data.error);
    //   });
    // REFACTOR
    setLoadingBySell(true);
    let res = await getArts('sold');
    // console.log('home res: ', res);
    const { data } = res;
    // if (data.response) {
    //   setError(data.response.data.error);
    //   setLoadingBySell(false);
    // } else {
      setArtBySell(data);
      setLoadingBySell(false);
    // }
  };

  const loadArtByCreation = async () => {
    // setLoading(true);
    // getArts('createdAt')
    //   .then(data => {
    //     setArtByCreation(data.data);
    //   })
    //   .catch(err => {
    //     const res = err.response;
    //     setError(res.data.error);
    //   });
    // setLoading(false);
    // REFACTOR
    setLoadingByCreated(true);
    let res = await getArts('createdAt');
    const { data } = res;
    // if (data.response) {
    //   setError(data.response.data.error);
    //   setLoadingByCreated(false);
    // } else {
      setArtByCreation(data);
      setLoadingByCreated(false);
    // }
  };

  useEffect(() => {
    // let cancel = false;
    async function fetchData() {
      loadArtByCreation();
      loadArtBySell();
      // if (!cancel) {
      //   console.log('Home data');
      // }
    }
    fetchData();
    // return () => (cancel = true);
  }, []);

  const showLoadingBySell = loadingBySell => (
    <div
      className="alert alert-success"
      style={{ display: loadingBySell ? '' : 'none' }}
    >
      <h2>Loading...</h2>
    </div>
  );

  const showLoadingByCreate = loadingByCreated => (
    <div
      className="alert alert-success"
      style={{ display: loadingByCreated ? '' : 'none' }}
    >
      <h2>Loading...</h2>
    </div>
  );

  return (
    <Layout
      title="Home Page"
      description="Welcome to Kevin Delvo's Art website!"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Newest</h2>
      {showLoadingBySell(loadingBySell)}
      <div className="row">
        {artByCreation && artByCreation.map((art, idx) => (
          <div key={idx} className="col-4 mb-3">
            <ArtCard art={art} />
          </div>
        ))}
      </div>

      <hr />
      <h2 className="mb-4">Best Sellers</h2>
      {showLoadingByCreate(loadingByCreated)}
      <div className="row">
        {artBySell && artBySell.map((art, idx) => (
          <div key={idx} className="col-4 mb-3">
            <ArtCard art={art} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
