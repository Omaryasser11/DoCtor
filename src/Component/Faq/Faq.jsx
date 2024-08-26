import React, { useState, useEffect} from 'react';
import './Faq.scss'
import { Helmet } from 'react-helmet-async';
import baseUrl from '../../BaseUrl'
import ReactPlayer from 'react-player'
import youtubeCover2 from '../../assets/images/BTM-1.jpeg'
import patientSelfie from '../../assets/images/patient-selfie.jpg'
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export default function Faq() {

    const [videos, setVideos] = useState('')
    const [texts, setTexts] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
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
    
      useEffect(()=>{
        baseUrl.get('faq/videos')
        .then(response=>{
          setVideos(response.data)
          setLoading(false)
        })
        .catch(error =>{
        setError(error)
        setLoading(false)
        })
      },[])

      useEffect(()=>{
        AOS.init({
          duration: 2000,
      });

        baseUrl.get('faq/texts')
        .then(response=>{
          setTexts(response.data)
          console.log(response.data);
          setLoading(false)
        })
        .catch(error =>{
        setError(error)
        setLoading(false)
        })
      },[])
    
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error: {error.message}</p>

  return <>
    <Helmet>
    <title>Frequently Asked Questions (FAQ)</title>
  </Helmet>
<div className="text-white">

                                                              {/* Header */}

    <header className="row gx-0 position-relative blueC" style={{ height: '318px' }}>
      <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100'>
          <div className='mt-3 d-flex flex-column justify-content-end position-absolute z-3' style={{ height: '200px' }}>
              <h4 className='fs-1 fw-semibold'>FAQ</h4>
              <p className='fs-4 fw-light mb-0'>Frequently Asked Questions</p>
          </div>
      </div>
    </header>

        {/* Body of faq videos */}

        <div className="row gx-0 py-5">
      <div className='offset-1 col-10 px-4'>
        <div className='mt-5'>
          <p className="text-dark-emphasis fw-semibold mb-0 fs-4">FAQ Videos</p>
          <p className='text-body-tertiary fw-light'>Frequently asked questions and tips on preparing for surgery, your procedure and post op care.</p>
        </div>
        <div className="row g-4">
        {videos.map((video)=><>
          <div key={video.id} className="col-lg-4">
            <div className='my-5'>
              <div className="cursor-pointer position-relative faqShadow video overflow-hidden" onClick={() => openCard(video.videoUrl)}>
                <div className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                  <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle"></i>
                </div>
                <div>
                <img src={youtubeCover2} className='w-100 scale' alt="youtube video" />
                </div>
              </div>
            </div>
          </div>
          </>)}
        </div>
      </div>
        </div>

        {/* Body of faq texts */}
    <div className="row gx-0 blueC">
        <div className='offset-1 col-10 row gx-5 gy-3 py-5 px-lg-4 px-md-3 px-2 h-100'>
        {texts.map((text)=>(
            text.type === 'Medical' ? <div key={text.id} className='col-lg-6'>
                <div>
                <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${text.id}`}  aria-expanded="false" aria-controls={`collapseExample${text.id}`}>
                   <span className='faqIcon d-flex justify-content-center align-items-center mx-2 rounded-circle fw-bold'></span>
                   <p className='mb-0'>{text.question}</p>
                </button>
                <div className="collapse" id={`collapseExample${text.id}`}>
                <div className="card card-body bg-transparent rounded-0 shadow-none text-white border-top-0">
                    {text.answer}
                </div>
                </div>
                </div>
            </div>:''
        ))}
        </div>
    </div>

        {/* Body of faq about */}
    <div className="row gx-0">
        <div className='offset-1 col-10 row gx-5 gy-lg-0 gy-4 px-lg-4 px-md-3 px-2 h-100'>
        <div className='col-lg-6'>
          <div className='pt-5 mt-3 pb-2' data-aos="fade-right">
            <span className='blueC my-3 px-3 py-1 fs-5 fw-semibold text-uppercase'>About Me</span>
          </div>
        {texts.map((text)=>(
            text.type === 'AboutMe' ? <div key={text.id} className='my-3'>
                <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${text.id}`}  aria-expanded="false" aria-controls={`collapseExample${text.id}`}>
                   <span className='faqIcon d-flex justify-content-center align-items-center mx-2 rounded-circle fw-bold faqIconAbout'></span>
                   <p className='mb-0 text-gray'>{text.question}</p>
                </button>
                <div className="collapse" id={`collapseExample${text.id}`}>
                <div className="card card-body bg-transparent rounded-0 shadow text-gray fw-light border-top-0">
                    {text.answer}
                </div>
                </div>
            </div>:''
        ))}
        </div>
        <div className='col-lg-6' data-aos="fade-left">
          <img src={patientSelfie} className='w-100' alt='doctor' />
        </div>
      </div>
    </div>
  </div>

    {/* Overlay of card */ }

    {
    isOverlayVisible ? <>
      <div className="vh-100 row position-fixed z-3 overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
        <div className="col-xl-8 col-lg-9 col-md-10 col-11">
          <div className='w-100'>
            <div className="text-end w-100">
              <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeCard}></i>
            </div>
            <div className='py-2'>
              {/* <img src={getImage} className={`w-100 ${style.imageSize}`} alt="youtube video" /> */}
              <ReactPlayer controls url={youtubeVideo} className="w-100 faqVideoSize" />
            </div>
          </div>
        </div>
      </div>
    </> : ''
  }
  </>
}
