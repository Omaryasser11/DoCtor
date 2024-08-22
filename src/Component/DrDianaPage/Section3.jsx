import React from 'react';
import './Section3.scss';
import Dr from '../../assets/-5854818776057495297_121.jpg';

const Section3 = () => {
  return (
    <div className="section3">
      <div className="row">
        <div className="col half white-background">
          <div className="image-wrapper">
            <div className="image-hover">
              <img 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRInfECBhmIX2_EtLv8X-LZ6-BaznQLGHEqwQ&s' 
                alt="OGEE Line"
              />
              <div className="color-overlay"></div>
            </div>
          </div>
        </div>

        <div className="col half blue-background flex">
          <div className="text-content">
            <h3>Ogee Lipo<sup>®</sup></h3>
            <p>
              Dr. Dina has a unique approach to liposuction and BBLs; 
              instead of just removing fat or making the butt larger, Dr. William follows his mantra of 
              “It’s all about the shape.” This has led Dr. William to develop his own style of liposuction, 
              which he calls ‘OGEE Lipo<sup>®</sup>’, where he applies the principles of architecture and nature 
              to reveal each patient’s OGEE Line—the beautiful shape of concavities and convexities to develop pretty, 
              natural butts with a round shape and voluptuous hips.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
