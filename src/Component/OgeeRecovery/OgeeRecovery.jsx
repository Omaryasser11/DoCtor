import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OgeeRecovery.scss'; // Import the SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
const OgeeRecovery = () => {
  return (
    <div
      id="reasons"
      className="flexR row full-width-section1 d-flex align-items-center justify-content-center col-10"
      style={{ paddingTop: '8vw', paddingBottom: '8vw' ,gap:'1rem' }}
    >
      <div className="col-md-6 video-column">
        <div className="video-box">
          <a href="https://youtu.be/9ExTXng13iU" className="full-link magnific-popup"></a>
          <img
            decoding="async"
            width="1280"
            height="720"
            src="https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery.jpeg"
            className="img-fluid radius"
            alt=""
            srcSet="https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery.jpeg 1280w, https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery-300x169.jpeg 300w, https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery-1024x576.jpeg 1024w, https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery-768x432.jpeg 768w, https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery-600x338.jpeg 600w, https://www.drwilliammiami.com/wp-content/uploads/2022/10/Ogee-Recovery-150x84.jpeg 150w"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
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
        </div>
      </div>
      <div className="col-md-6 text-column animated reveal-from-right">
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
            className="btn btn-accent-color small animated slideInUp"
            role="button"
            target="_blank"
            href="https://ogeerecovery.com/collections/ogeefaja"
          >
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default OgeeRecovery;
