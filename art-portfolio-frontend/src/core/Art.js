import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './coreHelper';
import ArtCard from './ArtCard';

const Art = props => {
  const [art, setArt] = useState({});
  const [relatedArt, setRelatedArt] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const artId = props.match.params.artId;
    loadArt(artId);
  }, [props]);

  const loadArt = artId => {
    read(artId)
      .then(data => {
        setArt(data.data);
        listRelated(data.data._id)
          .then(data => {
            setRelatedArt(data.data);
          })
          .catch(err => {
            const res = err.response;
            setError(res.data.error);
          });
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
      <div className="row">
        <div className="col-8">
          {art && art.description && (
            <ArtCard art={art} showViewArtButton={false} />
          )}
        </div>
        <div className="col-4">
          {relatedArt.length > 0 && <h4>Related pieces</h4>}
          {relatedArt.map((art, idx) => (
            <div key={idx} className="mb-3">
              <ArtCard art={art} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Art;
// checked
