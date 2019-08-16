import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './coreHelper';
import ArtCard from './ArtCard';

const Art = props => {
  const [art, setArt] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const artId = props.match.params.artId;
    loadArt(artId);
  }, []);

  const loadArt = artId => {
    read(artId)
      .then(data => {
        setArt(data.data);
      })
      .catch(err => {
        const res = err.response;
        setError(res.data.error);
      });
  };

  return (
    <Layout
      title={art && art.name}
      description={art && art.description && art.description.substring(0, 100)}
      className="container-fluid"
    >
      <h2 className="mb-4">Art</h2>
      <div className="row">
        {art && art.description && (
          <ArtCard art={art} showViewArtButton={false} />
        )}
      </div>
    </Layout>
  );
};

export default Art;
