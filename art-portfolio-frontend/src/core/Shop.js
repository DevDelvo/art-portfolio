import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import ArtCard from './ArtCard';
import { getArts } from './coreHelper';

const Shop = () => {
  return (
    <Layout
      title="Shop Page"
      description="Welcome to Kevin Delvo's Art website!"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-4">left sidebar</div>
        <div className="col-8">right sidebar</div>
      </div>
    </Layout>
  );
};

export default Shop;
