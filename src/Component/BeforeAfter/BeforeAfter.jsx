import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './BeforeAfter.module.css';
import { Helmet } from 'react-helmet-async';
import after1 from '../../assets/شفايف 74.png';
import after2 from '../../assets/شفايف 77.png';
import baseUrl from '../../BaseUrl';
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';

export default function BeforeAfter() {
  const [data, setData] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeLink, setActiveLink] = useState('All');
  const [getImage, setGetImage] = useState('');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  useEffect(() => {
    const handleScroll = () => {
      setIsFlipped(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  const openCard = (imageSrc) => {
    setGetImage(imageSrc);
    setIsOverlayVisible(true);
  };

  const closeCard = () => {
    setGetImage('');
    setIsOverlayVisible(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imageResponse, videoResponse] = await Promise.all([
          baseUrl.get('before-after/images'),
          baseUrl.get('before-after/videos'),
        ]);
        setData(imageResponse.data.data);
        setVideos(videoResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>Before-After</title>
      </Helmet>
      <div className="text-white montserrat mb-5">
        {/* Header */}
        <div className="row gx-0 position-relative blueC mb-2" style={{ height: '318px' }}>
          <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
            <div className='mt-3 d-flex flex-column justify-content-end position-absolute z-3' style={{ height: '200px' }}>
              <h4 className='fs-2 fw-semibold'>Before & After</h4>
              <p className='fs-4 fw-light mb-0'>Procedures by Dr. William Miami</p>
            </div>
          </div>
        </div>

        {/* Body of cards */}
        <div className="row gx-0 mb-5">
          <div className='offset-1 col-10 px-4'>
            <ul className="nav text-uppercase justify-content-center py-2 px-3">
              {['All', 'Augmentation', 'Reductiont', 'BBL', 'Lift', 'Tummy', 'Mommy', 'Implant', 'Breast'].map((linkName) => (
                <li className="nav-item" key={linkName}>
                  <Link
                    className={`nav-link border-bottom px-4 text-decoration-none text-center py-3 display-6 ${activeLink === linkName ? 'active' : ''}`}
                    to={'/before-after'}
                    onClick={() => handleLinkClick(linkName)}
                  >
                    {linkName}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="row gy-2">
              {data.map((item) => (
                <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                  <div className='me-xl-5 me-sm-4 card cursor-pointer border border-1 border-black rounded-1 overflow-hidden' onClick={() => openCard(item.imageUrl)}>
                    <img src={item.imageUrl} className='w-100' alt="before&after" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body of carousels */}
        <div className="row gx-0 bg-light py-5 pt-4 mb-5">
          <p className='display-6 text-center fw-semibold blueT p-2'>Real Patients. Real Results.</p>
          <div className='offset-1 col-10 px-md-5 px-4'>
            <div className="row g-5">
              <div className="col-lg-4 col-md-6">
                <div className='me-xl-5 me-sm-4 cursor-pointer overflow-hidden'>
                  <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {[after1, after2].map((imgSrc, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval="4000" onClick={() => openCard(imgSrc)}>
                          <img src={imgSrc} className="d-block w-100" alt={`Slide-${index + 1}`} />
                        </div>
                      ))}
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
      </div>

      {/* Body of videos */}
      <div className="row gx-0 montserrat mb-5">
        <div className='offset-1 col-10 px-4'>
          <div className="row gx-4 gy-5">
            {videos.map((video) => (
              <div key={video.id} className='col-sm-6'>
                <div className='text-center border-bottom border-secondary-subtle'>
                  <p className='fw-semibold text-body-secondary fs-5 mb-1'>{video.procedure.name}</p>
                  <p className='text-body-tertiary fw-medium pb-3'>Patient Results</p>
                </div>
                <div className='row'>
                  <div className='offset-3 col-6 pt-4 px-0'>
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

      {/* Overlay */}
      {isOverlayVisible && (
        <div className={`${style.overlay} position-fixed top-0 bottom-0 start-0 end-0 bg-opacity-75 z-3 d-flex align-items-center justify-content-center`}>
          <div className={`${style.card} rounded-1`} style={{ width: '700px', height: '90vh' }}>
            <div className='position-relative'>
              <img src={getImage} className='w-100 h-100 rounded-1' alt="Full view" />
              <button className={`${style.close} close bg-white rounded-circle border-0`} onClick={closeCard}>
                <i className="fa-solid fa-x text-black" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
