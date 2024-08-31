import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useRecoilState } from 'recoil';
import style from './BeforeAfter.module.css';
import after1 from '../../assets/شفايف 74.png';
import after2 from '../../assets/شفايف 77.png';
import baseUrl from '../../BaseUrl';
import { isFlippedState } from '../../store/index.js';

export default function BeforeAfter() {
  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeLink, setActiveLink] = useState('All');
  const [selectedImage, setSelectedImage] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isArrowsVisible, setIsArrowsVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
  const { language } = useContext(LanguageContext);

  const linkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const openCard = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsOverlayVisible(true);
  };

  const closeCard = () => {
    setSelectedImage('');
    setIsOverlayVisible(false);
    setIsArrowsVisible(false);
  };

  const openCarousel = (imageSrc) => {
    openCard(imageSrc);
    setIsArrowsVisible(true);
  };

  useEffect(() => {
    // Fetch images data
    baseUrl
      .get('before-after/images')
      .then((response) => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    // Fetch videos data
    baseUrl
      .get('before-after/videos', {
        headers: { 'Accept-Language': language },

      })
      .then((response) => {
        setVideos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsFlipped(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);

  if (loading) return <p lang={language}>Loading...</p>;
  if (error) return <p lang={language}>Error: {error.message || 'An error occurred'}</p>;

  return (
    <>
      <Helmet>
        <title lang={language}>{language === 'ar' ? "قبل و بعد" : "Before-After"}</title>
      </Helmet>
      <div className="text-white montserrat mb-5" lang={language}>
        {/* Header */}
        <div className="row gx-0 position-relative blueC mb-2" style={{ height: '318px' }}>
          <div className="offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100">
            <div className="mt-3 d-flex flex-column justify-content-end position-absolute z-3" style={{ height: '200px' }}>
              <h4 className="fs-2 fw-semibold" lang={language}>{language === 'ar' ? 'قبل و بعد' : 'Before & After'}</h4>
              <p className="fs-4 fw-light mb-0" lang={language}>{language === 'ar' ? 'الإعمال التي أجراتها الدكتوره دينا خيري' : 'Procedures by Dr. Dina Khairy'}</p>
            </div>
          </div>
        </div>

        {/* Body of cards */}
        <div className="row gx-0 mb-5">
          <div className="offset-1 col-10 px-4">
            <ul className="nav text-uppercase justify-content-center py-2 px-3">
              {['All', 'Augmentation', 'Reduction', 'BBL', 'Lift', 'Tummy', 'Mommy', 'Implant', 'Breast'].map((link) => (
                <li className="nav-item" key={link}>
                  <Link
                    className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === link ? 'active' : ''}`}
                    to="/before-after"
                    onClick={() => linkClick(link)}
                    lang={language}
                  >
                    {language === 'ar' ? translateLink(link) : link}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="row gy-2">
              {data.map((item) => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className="me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden" onClick={() => openCard(item.imageUrl)}>
                    <img src={item.imageUrl} className="w-100" alt="before&after" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body of carousels */}
        <div className="row gx-0 bg-light py-5 pt-4 mb-5">
          <p className="display-6 text-center fw-semibold blueT p-2" lang={language}>{language === 'ar' ? 'النتائج الحقيقية. المرضى الحقيقيون.' : 'Real Patients. Real Results.'}</p>
          <div className="offset-1 col-10 px-md-5 px-4">
            <div className="row g-5">
              <div className="col-lg-4 col-md-6">
                <div className="me-xl-5 me-sm-4 cursor-pointer overflow-hidden">
                  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active" data-bs-interval="4000" onClick={() => openCarousel(after1)}>
                        <img src={after1} className="d-block w-100" alt="First-Slide" />
                      </div>
                      <div className="carousel-item" data-bs-interval="4000">
                        <img src={after2} className="d-block w-100" alt="Second-Slide" onClick={() => openCarousel(after2)} />
                      </div>
                    </div>
                    <button className="carousel-control-prev prev opacity-100" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                      <i className="fa-solid fa-angle-left cursor-pointer darkCyan py-1 px-2 text-white" aria-hidden="true"></i>
                    </button>
                    <button className="carousel-control-next next opacity-100" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                      <i className="fa-solid fa-angle-right cursor-pointer darkCyan py-1 px-2 text-white" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body of videos */}
        <div className="row gx-0 montserrat mb-5">
          <div className="offset-1 col-10 px-4">
            <div className="row gx-4 gy-5">
              {videos.map((video) => (
                <div key={video.id} className="col-sm-6">
                  <div className="text-center border-bottom border-secondary-subtle">
                    <p className="fw-semibold text-body-secondary fs-5 mb-1" lang={language}>{video.procedure.name}</p>
                    <p className="text-body-tertiary fw-medium pb-3" lang={language}>{language === 'ar' ? 'نتائج المريض' : 'Patient Results'}</p>
                  </div>
                  <div className="row">
                    <div className="offset-3 col-6 pt-4 px-0">
                      <div>
                        <video controls className="w-100 scale" title={video.procedure.name}>
                          <source src={video.videoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay of card */}
        {isOverlayVisible && (
          <div className="vh-100 montserrat row position-fixed z-3 overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center" lang={language}>
            <div className="col-md-10 col-12">
              <div className="position-relative rounded-3 d-flex align-items-center justify-content-center flex-column w-100">
                <i className="fa-solid fa-xmark position-absolute end-0 text-white p-4 fs-3" onClick={closeCard}></i>
                <img src={selectedImage} alt="card" className="w-100" />
                {isArrowsVisible && (
                  <div className="position-absolute d-flex justify-content-between w-100">
                    <i className="fa-solid fa-angle-left cursor-pointer fa-2x text-white" aria-hidden="true"></i>
                    <i className="fa-solid fa-angle-right cursor-pointer fa-2x text-white" aria-hidden="true"></i>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Helper function for translations
function translateLink(link) {
  const translations = {
    'All': 'الكل',
    'Augmentation': 'تكبير',
    'Reduction': 'تصغير',
    'BBL': 'نحت',
    'Lift': 'شد',
    'Tummy': 'بطن',
    'Mommy': 'أمومة',
    'Implant': 'زرع',
    'Breast': 'ثدي'
  };
  return translations[link] || link;
}
