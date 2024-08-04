import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage.jsx'
import { isFlippedState } from './store/index.js' // Import Recoil state
import { useRecoilState } from 'recoil';
// import NavBarComponent from './Component/NavBarComponent.jsx';



function App() {
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);


  // Calculate the total quantity of items in the cart


  return (
    <div className="App">
      {/* { isFlipped &&
      <>
      <NavBarComponent/>
     

</>
 */}

      <Router>
        

        <Routes>
          <Route path="/" element={<HomePage />} />
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
