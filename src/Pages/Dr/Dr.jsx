import React, { useEffect } from 'react';
import Landing from '../../Component/DrDianaPage/LandingSection'
import Clients from '../../Component/DrDianaPage/Clients'
import CosmeticSurgerySection from '../../Component/DrDianaPage/CosmeticSurgerySection'
import Section3 from '../../Component/DrDianaPage/Section3'
import FamilyHobbiesSection from '../../Component/DrDianaPage/FamilyHobbiesSection'
import "./Dr.scss"
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
function Dr() {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);

  return (
    <section className='Dr'>
      <Landing></Landing>
      <Clients></Clients>
      <CosmeticSurgerySection></CosmeticSurgerySection>
      <Section3></Section3>
      <FamilyHobbiesSection></FamilyHobbiesSection>
    </section>
  )
}

export default Dr