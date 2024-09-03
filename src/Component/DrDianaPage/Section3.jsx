import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import './Section3.scss';
import Dr from '../../assets/-5854818776057495297_121.jpg';
import baseUrl from '../../BaseUrl';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Spinner from '../Spinner/Spinner';
const Section3 = () => {

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
        setData(response.data.thirdSection);
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
  return (
    <div className="section3">
      <div className="row">
        <div className="col half white-background" data-aos="zoom-in-up">
          <div className="image-wrapper">
            <div className="image-hover">
              <img
                src={data?.imageUrl || 'default-image.png'} // Fallback image
                alt="Section 3"
                width="200"
                height="150"
              />
              <div className="color-overlay"></div>
            </div>
          </div>
        </div>

        <div className="col half blue-background flex" data-aos="zoom-in-down">
          <div className="text-content">
            <h3 lang={language}>{data?.header || 'default-image.png'}<sup>®</sup></h3>
            <p lang={language} className='Y3'>
              {data?.body || 'default-image.png'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
