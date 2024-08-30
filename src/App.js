import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import DrWilliamSection from './Pages/Dr/Dr.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import { isFlippedState } from './store/index.js';
import NavBarComponent from './Component/NavBar/NavBarComponent.jsx';
import Footer from './Component/Footer/Footer.jsx';
import BeforeAndAfter from './Component/BeforeAfter/BeforeAfter.jsx';
import Procedures from './Component/Procedures/Procedures.jsx';
import Testimonials from './Component/Testimonials/Testimonials.jsx';
import Blog from './Component/Blog/Blog.jsx';
import Videos from './Component/Videos/Videos.jsx';
import Faq from './Component/Faq/Faq.jsx';
import { LanguageProvider, LanguageContext } from './store/LanguageContext.js';
import Spinner from './Component/Spinner/Spinner.jsx';
import { Toaster } from 'react-hot-toast';

function AppContent() {
  const [isFlipped] = useRecoilState(isFlippedState);
  const { language } = useContext(LanguageContext);

  // Determine the text direction based on the language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="App" dir={direction}>
    <Toaster />
      {isFlipped && <NavBarComponent />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dr" element={<DrWilliamSection />} />
        <Route path="/before" element={<BeforeAndAfter />} />
        <Route path="/procedures" element={<Procedures />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/Videosb" element={<Videos />} />
        <Route path='/Spinner' element={<Spinner></Spinner>} />
        <Route path="/Faq" element={<Faq />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
