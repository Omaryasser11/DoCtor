import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Ensure BrowserRouter is imported
import { useRecoilState } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import useIdleTimer from './store/useIdleTimer.js'; // Import the custom hook
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
import LoginForm from './Component/LoginPage/index.js';
import AboutDr from './Pages/AdminPage/AboutDr.jsx';

function AppContent() {
  const [isFlipped] = useRecoilState(isFlippedState);
  const { language } = useContext(LanguageContext);
  const handleIdle = () => {
    localStorage.removeItem("token");
  };

  // Use the idle timer hook with a timeout of 30 minutes
  const { showAlert } = useIdleTimer(30 * 60 * 1000, handleIdle);

  // Determine the text direction based on the language
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="App" dir={direction}>
      <Toaster />
      {isFlipped && <NavBarComponent />}
      {showAlert && (
        <div className="alert">
          <p>Your session is about to expire. Please save your work or stay active to continue.</p>
          {/* Add any additional UI elements or styles here */}
        </div>
      )}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dr" element={<DrWilliamSection />} />
        <Route path="/before" element={<BeforeAndAfter />} />
        <Route path="/procedures" element={<Procedures />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/admin" element={<AboutDr />} />
        {/* Add a 404 page route if needed */}
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router> {/* Use BrowserRouter here */}
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
