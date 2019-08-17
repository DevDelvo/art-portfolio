import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import { getArts } from './coreHelper';
import Search from './Search';

const Home = () => {
  const [artBySell, setArtBySell] = useState([]);
  const [artByCreation, setArtByCreation] = useState([]);
  const [err, setError] = useState(false);
  // const [isLoading, setLoading] = useState(false);

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
    let data = await getArts('sold');
    if (data.response) {
      setError(data.response.data.error);
    } else {
      setArtBySell(data);
    }
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
    let data = await getArts('createdAt');
    if (data.response) {
      setError(data.response.data.error);
    } else {
      setArtByCreation(data);
    }
  };

  useEffect(() => {
    loadArtByCreation();
    loadArtBySell();
  }, []);

  // const showLoading = () =>
  //   isLoading && (
  //     <div className="alert alert-success">
  //       <h2>Loading...</h2>
  //     </div>
  //   );

  return (
    <Layout
      title="Home Page"
      description="Welcome to Kevin Delvo's Art website!"
      className="container-fluid"
    >
      <Search />
      <h2 className="mb-4">Newest</h2>
      <div className="row">
        {artByCreation.map((art, idx) => (
          <div key={idx} className="col-4 mb-3">
            <ArtCard art={art} />
          </div>
        ))}
      </div>

      <hr />
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {artBySell.map((art, idx) => (
          <div key={idx} className="col-4 mb-3">
            <ArtCard art={art} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
// checked
