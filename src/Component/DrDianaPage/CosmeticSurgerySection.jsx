import React, { useState, useEffect } from 'react';
import './CosmeticSurgerySection.scss';
import Dr from "../../assets/دينا 2.png"
import baseUrl from '../../BaseUrl';
const CosmeticSurgerySection = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    baseUrl.get('/about') // Use the Axios instance directly
      .then(response => {
        setData(response.data.secondSection);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="cosmetic-surgery-section">
      <div className="row">
        <div className="column left-column">
          <h3>{data.header}</h3>
          <p>
            {data.body}
          </p>
        </div>
        <div className="column right-column">
          <div className="image-container">
            <img
              src={data.imageUrl}
              alt="Dr. William"
              className="responsive-image"
            />
            <div className="hover-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmeticSurgerySection;
