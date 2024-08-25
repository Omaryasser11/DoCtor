import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import baseUrl from '../../BaseUrl';
import './Portfolio.scss';
import { LanguageContext } from '../../store/LanguageContext'; // Import your context

const ROTATION_RANGE = 32.5;

const TiltCard = ({ imageSrc, altText }) => {
  useEffect(() => {
    AOS.init({
      duration: 2500,
    });
  }, []);

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    const rX = (mouseY - 0.75) * ROTATION_RANGE * -1.25;
    const rY = (mouseX - 0.75) * ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className="TiltCard"
    >
      <div className="TiltCard-inner">
        <img
          src={imageSrc}
          alt={altText}
          className="imgW"
        />
      </div>
    </motion.div>
  );
};

function Portfolio() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({
      duration: 3000, // Duration of animations
    });

    baseUrl.get('/before-after/images', {
      headers: { 'Accept-Language': language },
    })
      .then(response => {
        // Correctly accessing the array inside response.data.data
        const imageUrls = response.data.data.map(item => item.imageUrl);
        setImages(imageUrls);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [language]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='Portfolio col-12 flex Poto'>
      <div className='Last flex col-12' data-aos="fade-down-left">
        {images.map((image, index) => (
          <div key={index} className={`Q1 flexR`} data-aos={`fade-${index % 2 === 0 ? 'down-right' : 'up-right'}`}>
            <TiltCard
            className="IMGOO"
              imageSrc={image}
              altText={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
