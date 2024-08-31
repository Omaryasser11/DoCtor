import React, { useEffect } from 'react';
import Landing from '../../Component/DrDianaPage/LandingSection'
import Clients from '../../Component/DrDianaPage/Clients'
import CosmeticSurgerySection from '../../Component/DrDianaPage/CosmeticSurgerySection'
import Section3 from '../../Component/DrDianaPage/Section3'
import FamilyHobbiesSection from '../../Component/DrDianaPage/FamilyHobbiesSection'
import "./Dr.scss"
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
import AutoplaySwiper from '../../Component/Swiper/AutoplaySwiper.jsx';
import { px } from 'framer-motion';
function Dr() {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  useEffect(() => {
    // Set isFlipped to true on component mount
    setIsFlipped(true);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <section className='Dr'>
      <AutoplaySwiper></AutoplaySwiper>
      <Landing></Landing>
      <Clients></Clients>
      <CosmeticSurgerySection></CosmeticSurgerySection>
      <Section3></Section3>
      <FamilyHobbiesSection></FamilyHobbiesSection>
    </section>
  )
}

export default Dr