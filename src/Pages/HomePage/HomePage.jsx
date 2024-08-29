import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import LandingComponent from '../../Component/Landing/LandingComponent.jsx';
import NavBarComponent from '../../Component/NavBar/NavBarComponent.jsx';
import { isFlippedState } from '../../store/index.js'
import { useRecoilState } from 'recoil';
import About from '../../Component/AboutDrSection/About.jsx';
import OurSevices from '../../Component/OurSevices/OurSevices.jsx';
import OgeeLipo from '../../Component/OgeeLipo/OgeeLipo.jsx';
import PodcastSection from '../../Component/PodcastSection/PodcastSection.jsx';
import RealPatientsResults from '../../Component/RealPatients/RealPatients.jsx';
import Main from '../../Component/Portfilio/main.jsx';
import TestimonialsSection from '../../Component/TestimonialsSection/TestimonialsSection.jsx';
import RecentPosts from '../../Component/RecentPosts/RecentPosts.jsx';
import BlogPosts from '../../Component/BlogPosts/BlogPosts.jsx';
import FAQTestimonials from '../../Component/BlogPosts/FAQTestimonials.jsx';
import Footer from '../../Component/Footer/Footer.jsx';
import './HomePage.scss';

import Portfolio from '../../Component/Portfilio/Portfolio.jsx';

function HomePage() {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  const { language } = useContext(LanguageContext);
  const headline = language === 'ar'
    ? "مرضى حقيقيون ونتائج حقيقية"
    : "Real Patients. Real Results";
  const headline2 = language === 'ar'
    ? "أحدث ما توصلت إليه جراحة التجميل"
    : "The Latest In Cosmetic Surgery";

  return (
    <>



      <LandingComponent />
      <About></About>
      <OurSevices />
      <OgeeLipo />
      <PodcastSection />
      <RealPatientsResults
        lang={language}
        headline={headline}
      />
      <Portfolio />
      <RealPatientsResults
        lang={language}
        headline={headline2}
      />
      <TestimonialsSection />
      {/* <RecentPosts /> */}


      {/* <BlogPosts />
      <FAQTestimonials /> */}


    </>
  )
}

export default HomePage
