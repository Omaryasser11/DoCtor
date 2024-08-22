import React from 'react';
import './Footer.scss';
import LOGO from "../../assets/لوجو دينا المعدل.png"
import oOGO from "../../assets/logo-no-background.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faYoutube, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';

import LOGO2 from "../../assets/8-removebg-preview.png"
const Footer = () => {
  return (
    <div id="footer-outer" className='col-12'>
      <div id="footer-widgets">
        <div className="container col-12">
          <div className="row flexR col-12">
            <div className="col-4 flex">
              <div className="widget widget_text">
                <div className="textwidget">
                  <p>
                    <img
                      decoding="async"
                      className="alignnone size-full wp-image-5932"
                      src={LOGO}
                      alt=""
                      width="200"
                      height="150"
                    />
                  </p>

                </div>
              </div>
            </div>

            <div className='col-4 flexR SpanFooterParent'>
              <span className='Linko hover-1'>Features</span>
              <span className='Linko hover-1'>Blog</span>
              <span className='Linko hover-1'>pricing</span>
              <span className='Linko hover-1'>services</span>
            </div>

            <div className="col-4 flex">
            <div className="col span_7 col_last">
            <ul className="social flexR">
      <li>
        <a target="_blank" rel="noopener noreferrer" href="http://www.onlyfans.com/drwilliammiami">
          <FontAwesomeIcon icon={faTwitter} style={{ color: '#1DA1F2' }} />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/Drwilliammiami/">
    
          <FontAwesomeIcon icon={faFacebook} style={{ color: '#1877F2' }} />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCgrwz50ERG6TNcvfet5e6Mg">

          <FontAwesomeIcon icon={faYoutube} style={{ color: '#FF0000' }} />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/drwilliammiami/?hl=en">
  
          <FontAwesomeIcon icon={faInstagram} style={{ color: '#E1306C' }} />
        </a>
      </li>
      <li>
        <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@drwilliammiami">
      
          <FontAwesomeIcon icon={faTiktok} style={{ color: '#000000' }} />
        </a>
      </li>
    </ul>
          </div>
            </div>

            {/* <div className="col span_3 one-fourths right-edge">
              <div className="widget widget_text">
                <div className="textwidget">
                  <p>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.5677155902695!2d-80.26404181522584!3d25.75180541897774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b641820e4381%3A0xce1a03041391440a!2sCareaga%20Plastic%20Surgery!5e0!3m2!1sen!2sus!4v1708615874925!5m2!1sen!2sus"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      width="100%"
                      height="200"
                    ></iframe>
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="row" id="copyright">
        <div className="container">
          <div className="col-12 flexRR">
            <p>© 2024 Dr. Dina Khairy. All rights reserved</p>
            <img
                      decoding="async"
                      className="alignnone size-full wp-image-5932"
                      src={oOGO}
                      alt=""
                      width="150"
                      height="50"
                    />

          </div>

        </div>
      </div>
    </div>
  );
};

export default Footer;
