import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OgeeLipo.scss'; // Import the SCSS file
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const OgeeLipo = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000, // Duration of animations
      // You can add more AOS options here
    });
}, []);

  return (
    <div 
    data-aos="flip-up"
      id="fws_66a6b014264f4"
      className="row full-width-section top-margin-30px d-flex justify-content-cente col-12"
      style={{ paddingTop: '5vw', paddingBottom: '5vw', backgroundColor: '#0a2240' }}
    >
      <div className="col-12 text-center animated fade-in-from-bottom">
        <div className="content-wrapper">
          <h2>
            “The most important development in my career has been{' '}
            <span className="highlight">Ogee Lipo<sup style={{ fontSize: '16px' }}>®</sup></span>.”
          </h2>
        </div>
      </div>
    </div>
  );
};

export default OgeeLipo;
