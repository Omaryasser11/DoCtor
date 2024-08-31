import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import style from './Videos.module.css';
import { Helmet } from 'react-helmet-async';
import ReactPlayer from 'react-player';
import baseUrl from '../../BaseUrl';
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
import LandingVideo from '../../assets/4_5893503520266522924.mp4';
export default function Videos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [youtubeVideo, setYoutubeVideo] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);

  // Get the current language from context
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // Event listener for scroll
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsFlipped]);

  function openCard(videoUrl) {
    setYoutubeVideo(videoUrl);
    setIsOverlayVisible(true);
  }

  function closeCard() {
    setYoutubeVideo('');
    setIsOverlayVisible(false);
  }

  useEffect(() => {
    baseUrl.get('videos', {
      headers: { 'Accept-Language': language },
    })
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>{language === 'en' ? 'Loading...' : 'جاري التحميل...'}</p>;
  if (error) return <p>{language === 'en' ? `Error: ${error.message}` : `خطأ: ${error.message}`}</p>;

  return (
    <>
      <Helmet>
        <title>{language === 'en' ? 'Videos' : 'الفيديوهات'}</title>
      </Helmet>
      <div className="montserrat">
        {/* Header */}
        <div className="VVVV row rowW  gx-0 position-relative blueC mb-2 " style={{ height: '318px' }}>
          <video className='landingVideo col-12' src={LandingVideo} autoPlay loop muted></video>
          <div className='filterContainer col-12'>
            <div className='container d-flex align-items-center justify-content-center h-100'>
              <div className='mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center' style={{ height: '200px' }}>
                <h4 className='fs-1 fw-semibold text-white'>{language === 'en' ? 'Educational Videos' : 'فيديوهات تعليمية'}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Body of videos */}
        <div className="row gx-0 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start ">
          <div className='offset-1 col-10 px-4 ms-0'>
            <div className='text-center my-5'>
              <p lang={language} className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>
                {language === 'en' ? 'Behind the Mask is now also a Podcast!' : 'خلف القناع الآن أيضاً بودكاست!'}
              </p>
              <p className='fs-5 text-body-tertiary fw-bold text-uppercase'>
                {language === 'en' ? 'Available on YouTube, Spotify, and Apple Podcast.' : 'متاح على يوتيوب، سبوتيفاي، وآبل بودكاست.'}
              </p>
            </div>
            <div className="row g-5 ">
              {data.map((video) => (
                video.type === 'Podcast' ? (
                  <div key={video.id} className="col-lg-4" lang={language}>
                    <div lang={language} >
                      <div lang={language} className={`cursor-pointer position-relative ${style.shadow} video`} onClick={() => openCard(video.videoUrl)}>
                        <div lang={language} className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle play"></i>
                        </div>
                        <div lang={language} style={{ height: "280px" }}>
                          <img src={video.posterUrl} className='w-100' alt="youtube video" style={{ height: "100%" }} />
                        </div>
                      </div>
                      <div lang={language} className='my-5'>
                        <p className='text-body-secondary fw-semibold fs-4 mb-2' lang={language} >
                          {video.title}: <span lang={language} className='text-body-tertiary'>{video.subTitle}</span>
                        </p>
                        <p lang={language} className='text-light-emphasis'>{video.description}</p>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className='blueC text-white row gx-0 mt-5 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start'>
          <div className='offset-1 col-10 ms-0'>
            <div className="d-flex flex-lg-row flex-column align-items-center justify-content-lg-between justify-content-center w-100 p-4">
              <p className={`fw-semibold mb-lg-0 mb-3 fs-5 pe-lg-4`}>
                {language === 'en' ? 'All the information you need to know for your cosmetic surgery journey.' : 'كل المعلومات التي تحتاج إلى معرفتها لرحلة جراحة التجميل الخاصة بك.'}
              </p>
              <div lang={language} className={`d-flex align-items-center ${style.subscribe}`}>
                <div lang={language} className={`cursor-pointer d-flex justify-content-end overflow-hidden pe-4 align-items-center ${style.arrow} position-relative rotateArrow`}>
                  <i className={`${style.anglePositionOverlay}`}></i>
                  <i className={`fa-solid fa-angle-left ${style.right} `}></i>
                </div>
                <p className='fw-bold text-uppercase mb-0'>
                  {language === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body of videos 2 */}
        <div className="row bg-light gx-0 py-5 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
          <div className='offset-1 col-10 px-4 ms-0'>
            <div className='text-center my-5'>
              <p className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>
                {language === 'en' ? 'Educational Videos' : 'فيديوهات تعليمية'}
              </p>
              <p className='fs-5 text-body-tertiary fw-bold text-uppercase'>
                {language === 'en' ? 'Years of Experience | All Your Questions Answered' : 'سنوات من الخبرة | جميع أسئلتك مجابة'}
              </p>
            </div>
            <div className="row g-5">
              {data.map((video) => (
                video.type === 'Education' ? (
                  <div key={video.id} className="col-lg-4">
                    <div>
                      <div className={`cursor-pointer position-relative ${style.shadow} video overflow-hidden`} onClick={() => openCard(video.videoUrl)}>
                        <div className="position-absolute top-0 bottom-0 start-0 end-0 z-1 d-flex align-items-center justify-content-center">
                          <i className="fa-solid fa-play fs-5 text-white d-flex align-items-center justify-content-center rounded-circle"></i>
                        </div>
                        <div>
                          <img src={video.posterUrl} className='w-100' alt="youtube video" />
                        </div>
                      </div>
                      <div className='my-5'>
                        <p className='text-body-secondary fw-semibold fs-4 mb-2' lang={language} >
                          {video.title}: <span lang={language} className='text-body-tertiary'>{video.subTitle}</span>
                        </p>
                        <p className='text-light-emphasis' lang={language}>{video.description}</p>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div >

      {/* Overlay of card */}
      {isOverlayVisible && (
        <div className="vh-100 montserrat row position-fixed z-3 overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
          <div className="col-xl-8 col-lg-9 col-md-10 col-11">
            <div className='w-100'>
              <div className="text-end w-100">
                <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeCard}></i>
              </div>
              <div className='py-2'>
                <ReactPlayer controls url={youtubeVideo} className={`w-100 ${style.videoSize}`} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
