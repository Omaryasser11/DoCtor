import React from 'react';
import ImageCard from './ImageCard';

const Portfolio = () => {
  const images = [
    {
      imageUrl: 'https://www.drwilliammiami.com/wp-content/uploads/2022/10/ogeefaja-2-900x1200.jpg',
      altText: 'Ogee Faja',
      linkUrl: 'https://ogeerecovery.com/collections/ogeefaja',
      styles: { width: '596px', position: 'absolute', left: '0px', top: '0px', zIndex: '0' }
    },
    {
      imageUrl: 'https://www.drwilliammiami.com/wp-content/uploads/2022/10/OgeeLipo_ForJennifer-450x600.jpg',
      altText: 'Ogee Lipo®',
      linkUrl: 'https://www.drwilliammiami.com/procedures/liposuction/',
      styles: { width: '298px', position: 'absolute', left: '625px', top: '0px', zIndex: '31' }
    },
    // Add more image data here...
  ];

  return (
    <div className="portfolio-wrap spaced">
      <div className="row portfolio-items masonry-items constrain-max-cols isotope-activated" style={{ perspectiveOrigin: '50% 2803px', marginLeft: '-124px', left: '0px', width: '1493px', visibility: 'visible', position: 'relative', height: '3235.4px' }}>
        {images.map((image, index) => (
          <ImageCard key={index} {...image} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
