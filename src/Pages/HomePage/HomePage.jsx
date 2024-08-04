import React from 'react'

import LandingComponent from '../../Component/Landing/LandingComponent.jsx';
import NavBarComponent from '../../Component/NavBar/NavBarComponent.jsx';
import { isFlippedState } from '../../store/index.js'
import { useRecoilState } from 'recoil';
import About from '../../Component/AboutDrSection/About.jsx';
import OgeeRecovery from '../../Component/OgeeRecovery/OgeeRecovery.jsx';
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

function HomePage() {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);


  return (
    <>

      {isFlipped &&




        <NavBarComponent />

      }



      <LandingComponent />
      <About></About>
      <OgeeRecovery />
      <OgeeLipo />
      <PodcastSection />
      <RealPatientsResults />
      <Main />
      <TestimonialsSection />
      <RecentPosts />
      <BlogPosts />
      <FAQTestimonials />
      <Footer />
    </>
  )
}

export default HomePage
