import React, { useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Portfolio.scss'; // Ensure this is the correct path to your SCSS file
import Igg from "../../assets/وجه 5.png"
import Igg1 from "../../assets/شفايف 70.png"
import Igg2 from "../../assets/تكساس 51.png"
import Igg3 from "../../assets/شفايف 80.png"
import Igg4 from "../../assets/رقبة.png"
import Igg5 from "../../assets/وجه جانبي 2.png"
import Igg6 from "../../assets/وجه جانبي 2.png"
import Igg7 from "../../assets/شفايف 73.png"
import Igg8 from "../../assets/شفايف 78.png"
import Igg9 from "../../assets/وجه 6.png"
import Igg10 from "../../assets/نضارة بشرة.png"
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ imageSrc, altText }) => {
  useEffect(() => {
    AOS.init({
      duration: 2500, // Duration of animations
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
          className="TiltCard-img imgW"
        />
      </div>
    </motion.div>
  );
};

function Portfolio() {

  return (
    <div className='Portfolio col-12 flex Poto'>


      <div className='Last flexR col-12' data-aos="fade-down-left">

      <div className='col-4  Q1' data-aos="fade-down-right" >
          <TiltCard

            imageSrc={Igg}
            altText="Quiet"

          />
        </div>
        <div className='col-4 Q2' data-aos="fade-up-right">
          <TiltCard
            style={{ height: '400px' }}

            imageSrc={Igg2} />
        </div>

        <div className='Q3' >
          <TiltCard


            imageSrc={Igg3}
          />
        </div>
        <div className="Q4">
          <TiltCard


            imageSrc={Igg4} />
        </div>
        <div className="Q5">
          <TiltCard


            imageSrc={Igg5} />
        </div>
        <div className="Q6">
          <TiltCard

            imageSrc={Igg6} />
        </div>
        <div className="Q7">
          <TiltCard

            imageSrc={Igg7} />
        </div>
        <div className="Q8">
          <TiltCard

            imageSrc={Igg8} />
        </div>
        <div className="Q9">
          <TiltCard
            imageSrc={Igg9}
          />        </div>
        <div className="Q10">
          <TiltCard

            imageSrc={Igg10}
          />        </div>
      </div>
    </div>
  );
}

export default Portfolio;
