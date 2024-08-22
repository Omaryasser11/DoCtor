import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OgeeRecovery.scss'; // Import the SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import DD from "../../assets/عيادات غسن اعلان (1).png"
import AOS from 'aos';
import 'aos/dist/aos.css';
const OgeeRecovery = () => {
  useEffect(() => {
    AOS.init({
      duration: 1900, // Duration of animations
    });
  }, []);

  return (
    <section className='col-12 flex Section2'>
      <div
        id="reasons"
        className="flexR col-10"
        style={{ gap: '1rem' }}
      >
        <div className="col-md-6 video-column" data-aos="fade-right">
          <div className="video-box"
          
          >
            <a href="https://youtu.be/9ExTXng13iU" className="full-link magnific-popup"></a>
            <img
              decoding="async"
              width="1280"
              height="320"
              src={DD}
              className="img-fluid radius"
              alt=""
              srcSet={DD} />
            <a
              href="https://youtu.be/9ExTXng13iU"
              className="play_button large magnific-popup"
            >
              <span>
                <span className="play">
                  <span className="inner-wrap inner flex">
                    <FontAwesomeIcon className='playIcon' icon={faPlay} />
                  </span>
                </span>
              </span>
            </a>
            <div className='Filter2'></div>
          </div>
        </div>
        <div className="col-md-6 text-column "data-aos="fade-left">
          <div className="content-wrapper">
            <h3 className="title">OGEE RECOVERY</h3>
            <div className="divider"></div>
            <blockquote>
              <p>
                Welcome to the new gold standard in faja fit – The Ogee Faja, featuring functional fit technology created by a board-certified plastic surgeon. Thoughtfully designed to complement the work performed in the operating room.
              </p>
            </blockquote>
            <div className="divider"></div>
            <a
              className="btn1 btn"
              href="/dr-william/"
              role="button"
            >
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OgeeRecovery;
