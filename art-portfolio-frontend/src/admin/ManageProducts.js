import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getArts, getSingleArt, updateArt, deleteArt } from './adminHelper';

const ManageProducts = () => {
  const [art, setArt] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    let loaded = false;
    async function fetchArt() {
      loadArt();
      if (loaded) {
        console.log('Art has been loaded.')
      }
    }
    fetchArt();
    return () => loaded = true;
  }, []);

  const loadArt = async () => {
    try {
      const data = await getArts();
      console.log(data)
      setArt(data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateProduct = (artId) => {
    try {
      updateArt(artId, user._id, token);
      loadArt();
    } catch (err) {
      console.log(err)
    }
  }

  const deleteProduct = async (artId) => {
    try {
      await deleteArt(artId, user._id, token);
      loadArt();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout
      title="Manage Products"
      description="Manage products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">You have {art.length} prints for sale.</h2>
          <ul className="list-group">
            {
              art.map((item, idx) => {
                const { _id, category, name, description, createdAt } = item;
                return (
                  <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                    <strong>{name}</strong>
                    <Link to={`/admin/product/update/${_id}`}>
                      <span className="badge badge-warning badge-pill">Update</span>
                    </Link>
                    <span
                      className="badge badge-danger badge-pill"
                      onClick={() => deleteProduct(_id)}
                    >
                      Delete
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default ManageProducts;