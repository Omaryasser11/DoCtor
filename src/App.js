import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import DrWilliamSection from './Pages/Dr/Dr.jsx';
import HomePage from './Pages/HomePage/HomePage.jsx';
import { isFlippedState } from './store/index.js';

function App() {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  return (
    <div className="App">
      {isFlipped && (
        // Uncomment the NavBarComponent if it's needed
        // <NavBarComponent />
        null
      )}
<Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/dr" element={<DrWilliamSection />} />
  </Routes>
</Router>
    </div>
  );
}

export default App;
