import React from 'react';

const ImageCard = ({ imageUrl, altText, linkUrl, styles }) => {
  return (
    <div className="col elastic-portfolio-item regular element highlights animated-in" style={styles}>
      <div className="inner-wrap animated" data-animation="perspective">
        <div className="work-item style-5" data-custom-content="on" data-text-align="middle">
          <img className="sizer" src="https://www.drwilliammiami.com/wp-content/plugins/salient-portfolio/img/no-portfolio-item-photography-regular.jpg" alt={altText} />
          <div className="parallaxImg-wrap">
            <div className="parallaxImg">
              <div className="parallaxImg-container">
                <div className="parallaxImg-layers">
                  <div className="parallaxImg-rendered-layer">
                    <div className="bg-img" style={{ backgroundImage: `url(${imageUrl})` }}></div>
                  </div>
                  <div className="parallaxImg-rendered-layer">
                    <div className="bg-overlay"></div>
                    <div className="work-meta">
                      <div className="inner">
                        <div className="custom-content"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="parallaxImg-shadow"></div>
          </div>
          <a href={linkUrl} target="_blank" rel="noopener noreferrer"></a>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
