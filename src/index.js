import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css'
import "animate.css";
import "./index.scss";

import App from "./App";


import { RecoilRoot } from "recoil";



// import { Slideshow } from "./pages/";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <RecoilRoot>
    <App>

   
    </App>
    

    


    
  
  </RecoilRoot>



);

// #Essentials
// npm i -D react-router-dom@latest
// npm i sass
// npm i bootstrap@latest
// npm i axios
// npm i recoil

// #Fontawesome
// npm i --save @fortawesome/fontawesome-svg-core
// npm i --save @fortawesome/free-solid-svg-icons
// npm i --save @fortawesome/free-regular-svg-icons
// npm i --save @fortawesome/free-brands-svg-icons
// npm i --save @fortawesome/react-fontawesome@latest

// #Optional
// npm i sweetalert2
// npm i swiper
// npm i wowjs
// npm i animate.css --save

// #How to use
// # wow js
// import { WOW } from "wowjs";
// useEffect(() => {
//   const wow = new WOW({ live: false });
//   wow.init();
// });
