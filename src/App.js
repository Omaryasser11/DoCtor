import React from 'react';
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

function App() {
  const [isFlipped] = useRecoilState(isFlippedState);

  return (
    <HelmetProvider>
      <Router>
        <div className="App">
          {isFlipped && <NavBarComponent />}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dr" element={<DrWilliamSection />} />
            <Route path="/before" element={<BeforeAndAfter />} />
            <Route path="/procedures" element={<Procedures />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/Videosb" element={<Videos />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
