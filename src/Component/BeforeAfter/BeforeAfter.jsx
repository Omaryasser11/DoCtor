import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import style from './BeforeAfter.module.css';
import after from '../../assets/شفايف 80.png';
import after1 from '../../assets/شفايف 74.png';
import after2 from '../../assets/شفايف 77.png';
import after3 from '../../assets/شفايف 76.png';
import after4 from '../../assets/شفايف 75.png';
import after5 from '../../assets/شفايف 73.png';
import after6 from '../../assets/شفايف 72.png';
import after7 from '../../assets/شفايف 71.png';
import after8 from '../../assets/شفايف 70.png';
import girl from '../../assets/images/girl.jpg';
import carousel from '../../assets/images/RPRR01_CarouselC.jpg';
import carousel2 from '../../assets/images/RPRR04_CarouselD-512x512.jpg';
import video1 from '../../assets/images/img1.jfif';

export default function BeforeAfter() {
  const [activeLink, setActiveLink] = useState('All');
  const [getImage, setGetImage] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isArrowsVisible, setIsArrowsVisible] = useState(false);
  const overlayRef = useRef(null);

  function linkClick(linkName) {
    setActiveLink(linkName);
  }

  function openCard(imageSrc) {
    setGetImage(imageSrc);
    setIsOverlayVisible(true);
  }

  function closeCard() {
    setGetImage('');
    setIsOverlayVisible(false);
    setIsArrowsVisible(false);
  }

  function openCarousel(imageSrc) {
    openCard(imageSrc);
    setIsArrowsVisible(true);
  }

  return (
    <>
      <Helmet>
        <title>Before & After | Dr. Dina Khairy</title>
        <meta name="description" content="Before and after results of various procedures by Dr. Dina Khairy. Explore our gallery to see real patient results." />
      </Helmet>

      <div className="text-white montserrat mb-5">

        {/* Header */}
        <div className="position-relative row gx-0 cover mb-sm-5 mb-3" style={{ height: '318px' }}>
          <div className="layerC position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
          <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
            <div className='mt-3 d-flex flex-column justify-content-end position-absolute z-3' style={{ height: '200px' }}>
              <h4 className='fs-2 fw-semibold'>Before & After</h4>
              <p className='fs-4 fw-light mb-0'>Procedures by Dr. Dina Khairy</p>
            </div>
          </div>
        </div>

        {/* Body of cards */}
        <div className="row gx-0 mb-5">
          <div className='offset-1 col-10 px-4'>
            <ul className="nav text-uppercase justify-content-center py-2 px-3">
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'All' ? 'active' : ''}`} aria-current="page" to={'/before-after'} onClick={() => linkClick('All')}>All</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Augmentation' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Augmentation')}>Breast Augmentation</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Reductiont' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Reductiont')}>Breast Reductiont</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'BBL' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('BBL')}>BBL</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Lift' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Lift')}>Breast Lift w/ Implants</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Tummy' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Tummy')}>Tummy Tuck</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Mommy' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Mommy')}>Mommy Makeover</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Implant' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Implant')}>Implant Exchange</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === 'Breast' ? 'active' : ''}`} to={'/before-after'} onClick={() => linkClick('Breast')}>Breast Lift</Link>
              </li>
            </ul>
            <div className="row gy-2">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after)}>
                  <img src={after} className='w-100' alt="before&after" />
                </div>
              </div>

              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after1)}>
                  <img src={after1} className='w-100' alt="before&after" />
                </div>
              </div>
              
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after2)}>
                  <img src={after2} className='w-100' alt="before&after" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after3)}>
                  <img src={after3} className='w-100' alt="before&after" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after4)}>
                  <img src={after4} className='w-100' alt="before&after" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after5)}>
                  <img src={after5} className='w-100' alt="before&after" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after6)}>
                  <img src={after6} className='w-100' alt="before&after" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after7)}>
                  <img src={after7} className='w-100' alt="before&after" />
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(after8)}>
                  <img src={after8} className='w-100' alt="before&after" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <div className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-5' style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} onClick={closeCard}>
          <div className='position-relative'>
            <img src={getImage} className='img-fluid' alt="before&after" />
            {isArrowsVisible && (
              <>
                <div className='position-absolute top-50 start-0 translate-middle-y bg-dark text-white p-2 cursor-pointer' style={{ left: '-2.5rem' }} onClick={() => console.log('Previous')}>
                  <i className='bi bi-arrow-left fs-4'></i>
                </div>
                <div className='position-absolute top-50 end-0 translate-middle-y bg-dark text-white p-2 cursor-pointer' style={{ right: '-2.5rem' }} onClick={() => console.log('Next')}>
                  <i className='bi bi-arrow-right fs-4'></i>
                </div>
              </>
            )}
            <div className='position-absolute top-0 start-0 p-3'>
              <button className='btn btn-light' onClick={closeCard}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
