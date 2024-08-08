import React from 'react';

const ImageCard = ({ imageUrl, altText, linkUrl, styles }) => {
  return (
    <div className="col elastic-portfolio-item regular element highlights animated-in" style={styles}>
      <div className="inner-wrap animated" data-animation="perspective">
        <div className="work-item style-5" data-custom-content="on" data-text-align="middle">
          <img className="sizer" src="https://www.google.com/imgres?q=images&imgurl=https%3A%2F%2Fimg-cdn.pixlr.com%2Fimage-generator%2Fhistory%2F65bb506dcb310754719cf81f%2Fede935de-1138-4f66-8ed7-44bd16efc709%2Fmedium.webp&imgrefurl=https%3A%2F%2Fpixlr.com%2Fimage-generator%2F&docid=6dhDHhJGcmvL6M&tbnid=B_ypq20yGKrazM&vet=12ahUKEwjSu9vUwdyHAxXcfKQEHc5WCdIQM3oECF0QAA..i&w=500&h=500&hcb=2&ved=2ahUKEwjSu9vUwdyHAxXcfKQEHc5WCdIQM3oECF0QAA" alt={altText} />
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
