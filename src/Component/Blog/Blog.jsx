import React, { useState,useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import style from './Blog.scss';
import cardImg from '../../assets/images/Ultrasound_Blog3-1024x576.jpg';
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
export default function Blog() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 24;
  const cardData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    // Add more data as needed
  ];
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);


  const count = Math.ceil(cardData.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cardData.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Helmet>
        <title>Our Blog</title>
      </Helmet>
      <div className="montserrat bg-light pb-5 ttte">
        {/* Header */}
        <div className="text-white position-relative blueC header-height">
          <div className="layerC position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
          <div className='container d-flex align-items-center justify-content-center h-100'>
            <div className='mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center' style={{ height: '200px' }}>
              <h4 className='fs-1 fw-semibold'>Latest in Cosmetic Surgery</h4>
            </div>
          </div>
        </div>

        {/* Body of cards */}
        <div className="row gx-0">
          <div className='offset-1 col-10 p-4 row g-5'>
            <div className="col-lg-4 col-sm-6">
              <div className={`cursor-pointer position-relative ${style.shadow} video overflow-hidden rounded-2 bg-white`}>
                <div className='overflow-hidden'>
                  <img src={cardImg} className='w-100 scale' alt="youtube video" />
                </div>
                <div className='m-4'>
                  <div className='my-2 position-relative d-flex flex-wrap'>
                    <Link to={'/our-blog'} className={`small text-decoration-none darkCyan-text fw-medium ${style.linkBlog} mb-2 me-3`}>Plastic Surgery</Link>
                    <Link to={'/our-blog'} className={`small text-decoration-none darkCyan-text fw-medium ${style.linkBlog} mb-2 me-3`}>Cosmetic Surgery</Link>
                    <Link to={'/our-blog'} className={`small text-decoration-none darkCyan-text fw-medium ${style.linkBlog} mb-2 me-3`}>Liposuction</Link>
                    <Link to={'/our-blog'} className={`small text-decoration-none darkCyan-text fw-medium ${style.linkBlog} mb-2 me-3`}>post-op recovery</Link>
                  </div>
                  <div>
                    <h4 className='fs-5 fw-semibold text-black'>Revolutionizing Rhinoplasty</h4>
                    <p className='text-secondary-emphasis my-3'>Rhinoplasty, commonly known as a "nose job," has been a popular cosmetic procedure for decades.…</p>
                    <Link to={'/our-blog'} className={`small text-decoration-none fw-medium text-secondary-emphasis d-flex mb-2 me-3 ${style.circleLink}`}>
                      <div className={`rounded-circle ${style.sizeCircle} ${style.shadowCircle} me-3`}></div>
                      Dr. William Miami<br />
                      May 18, 2024
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <nav className='mt-4 mb-5'>
          <Pagination
            count={count}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </nav>
      </div>
    </>
  );
}
