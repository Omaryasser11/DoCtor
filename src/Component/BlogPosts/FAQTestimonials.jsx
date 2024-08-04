import React from 'react';
import './styles.scss';

const FAQTestimonials = () => {
  return (
    <div className="vc_row full-width-content">
      <div className="vc_column_container col padding-10-percent light">
        <a className="column-link" target="_self" href="https://drwilliammiami.com/faq/"></a>
        <div className="column-image-bg-wrap">
          <div className="column-image-bg" />
        </div>
        <div className="column-bg-overlay-wrap">
          <div className="column-bg-overlay" />
        </div>
        <div className="wpb_wrapper">
          <div className="morphing-outline" data-starting-color="#00718b" data-hover-color="#7fcacd">
            <div className="inner">
              <h5><i>FAQ</i></h5>
              <h2>Ask Dr. William</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="vc_column_container col padding-10-percent dark">
        <a className="column-link" target="_self" href="/testimonials/"></a>
        <div className="column-image-bg-wrap">
          <div className="column-image-bg" />
        </div>
        <div className="column-bg-overlay-wrap">
          <div className="column-bg-overlay" />
        </div>
        <div className="wpb_wrapper">
          <div className="morphing-outline" data-starting-color="#ffffff" data-hover-color="#ffffff">
            <div className="inner">
              <h5><i>Patient</i></h5>
              <h3>Testimonials</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQTestimonials;
