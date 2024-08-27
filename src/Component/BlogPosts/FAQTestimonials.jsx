import React, { useState, useEffect } from 'react';import './styles.scss';
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';

const FAQTestimonials = () => {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  useEffect(() => {
    // Event listener for scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);

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
