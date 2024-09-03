import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './CosmeticSurgerySection.scss';
import Dr from "../../assets/دينا 2.png"
import baseUrl from '../../BaseUrl';
import Spinner from '../Spinner/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const CosmeticSurgerySection = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({
      duration: 3000, // Duration of animations
      // You can add more AOS options here
    });
      baseUrl.get('/about', {
        headers: { 'Accept-Language': language },
      })
      .then(response => {
        setData(response.data.secondSection);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div className="position-fixed top-0 bottom-0 start-0 end-0 bg-light d-flex align-items-center justify-content-center high-index">
  <Spinner />
</div>
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div className="cosmetic-surgery-section">
      <div className="row">
        <div className="column left-column" data-aos='zoom-in-down'>
          <h3 className="" lang={language}>{data.header}</h3>
          <p className="Y3" lang={language}>
            {data.body}
          </p>
        </div>
        <div className="column right-column" data-aos='zoom-in-up'>
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
