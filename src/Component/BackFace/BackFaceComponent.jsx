import React from 'react';
import './BackFaceComponent.scss';
import BREAST from '../../assets/BREAST.png';
import BREASTLIFT from '../../assets/BREAST-LIFT.png';
import BBL from '../../assets/BBL.png';
import OGEELIPO from '../../assets/OGEE-LIPO.png';
import MOMMYMAKEOVER from '../../assets/MOMMY-MAKEOVER.png';
import TUMMYTUCK from '../../assets/TUMMY-TUCK.png';


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
