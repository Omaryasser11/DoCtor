import React, { useState, useEffect } from 'react';
import LandingVideo from '../../assets/4_5893503520266522924.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import BackFaceComponent from '../BackFace/BackFaceComponent.jsx';
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
import './LandingComponent.scss';
function LandingComponent() {
  const words = ["It's", "All", "About", "The", "Shape"];
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  const [scaleOutClass, setScaleOutClass] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setScaleOutClass('scaleOut');
  };

  const handleTransitionEnd = () => {
    setScaleOutClass('');
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      // When the user reaches the top of the page
      if (isFlipped) {
        setIsFlipped(false);
        setScaleOutClass('scaleOut');
      }
    } else if (currentScrollY > lastScrollY) {
      // When the user scrolls down
      if (!isFlipped) {
        setIsFlipped(true);
        setScaleOutClass('scaleOut');
      }
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isFlipped]);

  return (
    <>
      <div className='scene col-12'>
        <div className={`box ${isFlipped ? 'flipped' : ''} ${scaleOutClass} col-12`} onTransitionEnd={handleTransitionEnd}>
          <div className="landingContainer boxFace boxFaceFront col-12">
            <video className='landingVideo col-12' src={LandingVideo} autoPlay loop muted></video>
            <div className='filterContainer col-12'>
              <div className="textContainer col-12">
                <h1 className='topHeading col-12'>
                  {words.map((word, index) => (
                    <span key={index} className='wrapped' style={{ '--i': index }}>{word} </span>
                  ))}
                </h1>
                <h4 className='buttonHeading '>
                  <span>Meet Dr. DINA Khairy | Board Certified Plastic Surgeon</span>
                </h4>
              </div>
              <FontAwesomeIcon className='angleIcon' icon={faAngleDown} onClick={handleClick} />
            </div>
          </div>
          <div className="boxFace boxFaceBottom">
            <BackFaceComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingComponent;
