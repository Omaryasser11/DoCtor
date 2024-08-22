import React from 'react';
import './BackFaceComponent.scss';
import BREAST from '../../assets/1-removebg-preview (1).png'
import TUMMYTUCK from '../../assets/3-removebg-preview.png';
import BBL from '../../assets/4-removebg-preview.png';
import OGEELIPO from '../../assets/6-removebg-preview.png';
import MOMMYMAKEOVER from '../../assets/5-removebg-preview.png';
import BREASTLIFT from '../../assets/8-removebg-preview.png';


function BackFaceComponent() {
  return (
    <div className="backFace">
        <div className='imageText'>
   <img className='image'  src={BREAST}></img>
   <p className='imageDescribtion'>

Breast Augmentation</p>
   </div>
   <div className='imageText'>
   <img className='image'  src={BREASTLIFT}></img>
   <p className='imageDescribtion'>

   Breast Lift</p>
   </div>
   <div className='imageText'>
   <img className='image'  src={BBL}></img>
   <p className='imageDescribtion'>

   Brazilian Butt Lift

</p>
   </div>
   <div className='imageText'>
   <img className='image'  src={OGEELIPO}></img>
   <p className='imageDescribtion'>



Ogee Lipo®
</p>
   </div>
   <div className='imageText'>
   <img className='image'  src={MOMMYMAKEOVER}></img>
   <p className='imageDescribtion'>



Mommy Makeover</p>
   </div>
   <div className='imageText'>
   <img className='image'  src={TUMMYTUCK}></img>
   <p className='imageDescribtion'>
   Tummy Tuck</p>
   </div>
</div>

  );
}

export default BackFaceComponent;
