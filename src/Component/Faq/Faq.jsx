import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import { useRecoilState } from 'recoil';
import './Faq.scss';
import { Helmet } from 'react-helmet-async';
import baseUrl from '../../BaseUrl';
import ReactPlayer from 'react-player';
import youtubeCover2 from '../../assets/images/BTM-1.jpeg';
import patientSelfie from '../../assets/images/patient-selfie.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { isFlippedState } from '../../store/index.js';
export default function Faq() {
    const [videos, setVideos] = useState([]);
    const [texts, setTexts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [youtubeVideo, setYoutubeVideo] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
    // Get the current language from context
    const { language } = useContext(LanguageContext);

    // Function to open a video card
    function openCard(videoUrl) {
        setYoutubeVideo(videoUrl);
        setIsOverlayVisible(true);
    }

    // Function to close the video card
    function closeCard() {
        setYoutubeVideo('');
        setIsOverlayVisible(false);
    }

    useEffect(() => {
        AOS.init({
            duration: 2000,
        });

        baseUrl.get('faq/videos',
            {
                headers: { 'Accept-Language': language },
            }
        )
            .then(response => {
                setVideos(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        baseUrl.get('faq/texts')
            .then(response => {
                setTexts(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch(error => {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Translations for the component
    const translations = {
        en: {
            title: "Frequently Asked Questions (FAQ)",
            faqHeader: "FAQ",
            faqSubtitle: "Frequently Asked Questions",
            faqVideosTitle: "FAQ Videos",
            faqVideosDescription: "Frequently asked questions and tips on preparing for surgery, your procedure and post op care.",
            aboutMeTitle: "About Me",
            switchToArabic: "Switch to Arabic",
        },
        ar: {
            title: "الأسئلة الشائعة",
            faqHeader: "الأسئلة الشائعة",
            faqSubtitle: "الأسئلة الشائعة",
            faqVideosTitle: "فيديوهات الأسئلة الشائعة",
            faqVideosDescription: "الأسئلة الشائعة والنصائح حول التحضير للجراحة وإجراءك والرعاية بعد العملية.",
            aboutMeTitle: "معلومات عني",
            switchToArabic: "التبديل إلى الإنجليزية",
        }
    };

    // Select the appropriate translations based on the current language
    const t = translations[language] || translations.en;

    return (
        <>
            <Helmet>
                <title>{t.title}</title>
            </Helmet>
            <div className="text-white">
                {/* Header */}
                <header className="row gx-0 position-relative blueC d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start" style={{ height: '318px' }}>
                    <div className='offset-1 col-10 px-lg-4 px-md-3 px-2 d-flex align-items-center h-100 ms-0'>
                        <div className='mt-3 d-flex flex-column justify-content-end position-absolute z-3' style={{ height: '200px' }}>
                            <h4 className='fs-1 fw-semibold'>{t.faqHeader}</h4>
                            <p className='fs-4 fw-light mb-0'>{t.faqSubtitle}</p>
                        </div>
                    </div>
                </header>

                {/* Body of FAQ videos */}
                <div className="row gx-0 py-5 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className='offset-1 col-10 px-4 ms-0'>
                        <div className='mt-5'>
                            <p className="text-dark-emphasis fw-semibold mb-0 fs-4">{t.faqVideosTitle}</p>
                            <p className='text-body-tertiary fw-light'>{t.faqVideosDescription}</p>
                        </div>
                        <div className="row g-4">
                            {videos.map((video, index) => (
                                <div key={video.id} className="col-lg-4" data-aos="fade-up" data-aos-duration={index * 500 + 1500}>
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
                            ))}
                        </div>
                    </div>
                </div>

                {/* Body of FAQ texts */}
                <div className="row gx-0 blueC d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className='offset-1 col-10 row gx-5 gy-3 py-5 px-lg-4 px-md-3 px-2 h-100 ms-0'>
                        {texts.map((text, index) => (
                            text.type === 'Medical' ? (
                                <div key={text.id} className='col-lg-6' data-aos="fade-right" data-aos-duration={index * 500 + 1500}>
                                    <div>
                                        <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${text.id}`} aria-expanded="false" aria-controls={`collapseExample${text.id}`}>
                                            <span className='faqIcon d-flex justify-content-center align-items-center mx-2 rounded-circle fw-bold'></span>
                                            <p className='mb-0'>{text.question}</p>
                                        </button>
                                        <div className="collapse" id={`collapseExample${text.id}`}>
                                            <div className="card card-body bg-transparent rounded-0 shadow-none text-white border-top-0">
                                                {text.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>

                {/* Body of FAQ about */}
                <div className="row gx-0 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className='offset-1 col-10 row gx-5 gy-lg-0 gy-4 px-lg-4 px-md-3 px-2 h-100 ms-0'>
                        <div className='col-lg-6'>
                            <div className='pt-5 mt-3 pb-2' data-aos="fade-right">
                                <span className='blueC my-3 px-3 py-1 fs-5 fw-semibold text-uppercase'>{t.aboutMeTitle}</span>
                            </div>
                            {texts.map((text, index) => (
                                text.type === 'AboutMe' ? (
                                    <div key={text.id} className='my-3' data-aos="fade-left" data-aos-duration={index * 500 + 1500}>
                                        <button className="btn w-100 fw-semibold rounded-0 faqCollapse text-white border-none border-0 text-start ps-0 py-2 d-flex align-items-center" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample${text.id}`} aria-expanded="false" aria-controls={`collapseExample${text.id}`}>
                                            <span className='faqIcon d-flex justify-content-center align-items-center mx-2 rounded-circle fw-bold faqIconAbout'></span>
                                            <p className='mb-0 text-gray'>{text.question}</p>
                                        </button>
                                        <div className="collapse" id={`collapseExample${text.id}`}>
                                            <div className="card card-body bg-transparent rounded-0 shadow text-gray fw-light border-top-0">
                                                {text.answer}
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            ))}
                        </div>
                        <div className='col-lg-6 position-relative' data-aos="fade-left">
                            <img src={patientSelfie} className='rounded-3 w-100' alt='Patient Selfie' />
                        </div>
                    </div>
                </div>

                {/* Video overlay */}
                {youtubeVideo && (
                    <div className='position-fixed top-0 start-0 bottom-0 end-0 faq-overlay d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: '1050' }} onClick={closeCard}>
                        <ReactPlayer
                            url={youtubeVideo}
                            playing={true}
                            controls={true}
                            className="faq-video-player"
                        />
                        <button className='btn btn-light position-absolute top-0 end-0 m-3' onClick={closeCard}>X</button>
                    </div>
                )}
            </div>
        </>
    );
}
