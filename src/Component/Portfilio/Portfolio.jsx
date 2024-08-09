import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import './Portfolio.scss'; // Ensure this is the correct path to your SCSS file

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ imageSrc, altText }) => {
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
          className="TiltCard-img imgW"
        />
      </div>
    </motion.div>
  );
};

function Portfolio() {
  return (
    <div className='Portfolio col-12 flexR Poto'>
      <div className='First col-4'>
        <div className='col-12  Q1' >
          <TiltCard

            imageSrc="https://media.istockphoto.com/id/1191834325/photo/woman-with-index-finger-on-lips-asking-to-be-quiet-or-keep-secret.jpg?s=612x612&w=0&k=20&c=w-5MBbMc8E96QJDY3x3xpXFj5omg5qTI7DLrUtu-UTk="
            altText="Quiet"

          />
        </div>
        <div className='col-12 Q2'>
          <TiltCard
            style={{ height: '400px' }}
            imageSrc="https://images.pexels.com/photos/19293634/pexels-photo-19293634/free-photo-of-smiling-woman-in-traditional-clothing.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" altText="Green Lines"
          />
        </div>

      </div>

      <div className='Last'>
        <div className='Q3' >
          <TiltCard

            imageSrc="https://images.pexels.com/photos/27430539/pexels-photo-27430539/free-photo-of-blue-eyes-with-horse.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" altText="Palm Shadow"
          />
        </div>
        <div className="Q4">
          <TiltCard

            imageSrc="https://images.pexels.com/photos/27240568/pexels-photo-27240568/free-photo-of-a-man-riding-a-white-horse-in-the-mountains.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" altText="Curved Roads"
          />
        </div>
        <div className="Q5">
          <TiltCard

            imageSrc="https://images.pexels.com/photos/27601443/pexels-photo-27601443/free-photo-of-arte-brasileira.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" altText="Digital Geometry"
          />
        </div>
        <div className="Q6">
          <TiltCard
            imageSrc="https://images.pexels.com/photos/27516891/pexels-photo-27516891/free-photo-of-woman-sitting-in-sweater.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" altText="Blue Abstract"
          />
        </div>
        <div className="Q7">
          <TiltCard
            imageSrc="https://images.pexels.com/photos/26699776/pexels-photo-26699776/free-photo-of-a-beach-with-yellow-and-white-umbrellas-and-chairs.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          />
        </div>
        <div className="Q8">
          <TiltCard
            imageSrc="https://images.pexels.com/photos/27364561/pexels-photo-27364561/free-photo-of-elderly-man-with-traditional-headwear.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          />
        </div>
        <div className="Q9">
          <TiltCard
            imageSrc="https://images.pexels.com/photos/27519599/pexels-photo-27519599/free-photo-of-a-balcony-with-green-shutters-and-a-balcony-railing.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        </div>
        <div className="Q10">
          <TiltCard
            imageSrc="https://images.pexels.com/photos/27222426/pexels-photo-27222426/free-photo-of-couple-lying-down-on-floor-and-reading-book.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" />
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
