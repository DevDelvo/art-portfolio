import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import { getArts } from './coreHelper';

const Home = () => {
  const [artBySell, setArtBySell] = useState([]);
  const [artByCreation, setArtByCreation] = useState([]);
  const [err, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loadArtBySell = () => {
    setLoading(true);
    getArts('sold')
      .then(data => {
        setArtBySell(data.data);
      })
      .catch(err => {
        const res = err.response;
        setError(res.data.error);
      });
    setLoading(false);
  };

  const loadArtByCreation = () => {
    setLoading(true);
    getArts('createdAt')
      .then(data => {
        setArtByCreation(data.data);
      })
      .catch(err => {
        const res = err.response;
        setError(res.data.error);
      });
    setLoading(false);
  };

  useEffect(() => {
    loadArtByCreation();
    loadArtBySell();
  }, []);

  const showLoading = () =>
    isLoading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Home Page"
      description="Welcome to Kevin Delvo's Art website!"
      className="container-fluid"
    >
      <h2 className="mb-4">Newest</h2>
      <div className="row">
        {artByCreation.map((art, idx) => (
          <ArtCard key={idx} art={art} />
        ))}
      </div>

      <hr />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {artBySell.map((art, idx) => (
          <ArtCard key={idx} art={art} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
