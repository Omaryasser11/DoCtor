import React, { useState } from 'react';
import style from './Videos.module.css'
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player'
import youtubeCover from '../../assets/images/youtubeCover.jpeg'
import youtubeCover2 from '../../assets/images/BTM-1.jpeg'

export default function Videos() {

  const [youtubeVideo, setYoutubeVideo] = useState(null)
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  function openCard(videoUrl) {
    setYoutubeVideo(videoUrl);
    setIsOverlayVisible(true)
  }

  function closeCard() {
    setYoutubeVideo('');
    setIsOverlayVisible(false)
  }

  return <>
    <Helmet>
      <title>Videos</title>
    </Helmet>
    <div className="montserrat">

      {/* Header */}

      <div className="text-white position-relative blueC mb-5 header-height" style={{ margin: '5rem'} } >
        <div className="layerC position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
        <div className='container d-flex align-items-center justify-content-center h-100'>
            <div className='mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center' style={{ height: '200px' }}>
                <h4 className='fs-1 fw-semibold'>Educational Videos</h4>
            </div>
        </div>
    </div>

    {/* Body of videos */}

    <div className="row gx-0">
      <div className='offset-1 col-10 px-4'>
        <div className='text-center my-5'>
          <p className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>Behind the Mask is now also a Podcast!</p>
          <p className='fs-5 text-body-tertiary fw-bold text-uppercase'>Available on YouTube, Spotify, and Apple Podcast.</p>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div>
              <div className={`cursor-pointer position-relative ${style.shadow} video`} onClick={() => openCard('https://www.youtube.com/watch?v=EuG8p8FRCHg')}>
                <div className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle play"></i>
                </div>
                <div>
                  <img src={youtubeCover} className='w-100' alt="youtube video" />
                </div>
              </div>
              <div className='my-5'>
                <p className='text-body-secondary fw-semibold fs-4 mb-2'>Behind the Mask- The Podcast: <span className='light-gray'>Plastic Surgery Facts, Fiction and the Five W’s</span></p>
                <p className='text-light-emphasis'>Dr. William Miami and Gabby Allen, introduce us to this new space where the goal is to educate you on everything you need to know before having any plastic surgery. Remember “the more you know, the better you look.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Subscribe */}

    <div className='blueC-two text-white row gx-0 mt-5'>
      <div className='offset-1 col-10'>
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-lg-between justify-content-center w-100 p-4">
          <p className={`fw-semibold mb-lg-0 mb-3 fs-5 pe-lg-4`}>All the information you need to know for your cosmetic surgery journey.</p>
          <div className={`d-flex align-items-center ${style.subscribe}`}>
            <div className={`cursor-pointer d-flex justify-content-end overflow-hidden pe-4 align-items-center ${style.arrow} position-relative rotateArrow`}>
              <i className={`${style.anglePositionOverlay}`}></i>
              <i className={`fa-solid fa-angle-left ${style.right} `}></i>
            </div>
            <p className='fw-bold text-uppercase mb-0'>Subscribe Now</p>
          </div>
        </div>
      </div>
    </div>

    {/* Body of videos 2 */}

    <div className="row bg-light gx-0 py-5">
      <div className='offset-1 col-10 px-4'>
        <div className='text-center my-5'>
          <p className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>Educational Videos</p>
          <p className='fs-5 text-body-tertiary fw-bold text-uppercase'>Years of Experience | All Your Questions Answered</p>
        </div>
        <div className="row g-5">
          <div className="col-lg-4">
            <div>
              <div className={`cursor-pointer position-relative ${style.shadow} video overflow-hidden`} onClick={() => openCard('https://www.youtube.com/watch?v=bXPe-_KIIk4')}>
                <div className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle"></i>
                </div>
                <div>
                  <img src={youtubeCover2} className='w-100 scale' alt="youtube video" />
                </div>
              </div>
              <div className='my-5'>
                <p className='text-body-secondary fw-semibold fs-4 mb-2'>Behind the Mask <span className='light-gray'>Season 1</span></p>
                <p className='text-light-emphasis'>Educational videos about procedures, patient results, recovery, complications & more.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div >

    {/* Overlay of card */ }

  {
    isOverlayVisible ? <>
      <div className="vh-100 montserrat row position-fixed z-3 overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-9 col-md-10 col-11">
          <div className='w-100'>
            <div className="text-end w-100">
              <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeCard}></i>
            </div>
            <div className='py-2'>
              {/* <img src={getImage} className={`w-100 ${style.imageSize}`} alt="youtube video" /> */}
              <ReactPlayer controls url={youtubeVideo} className={`w-100 ${style.videoSize}`} />
            </div>
          </div>
        </div>
      </div>
    </> : ''
  }
</>
}
