import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.scss'; // Import the SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import DD from "../../assets/Youtube Thumbnail DINA.png";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import baseUrl from '../../BaseUrl';

const AboutDrWilliam = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullBio, setShowFullBio] = useState(false); // State for toggling bio display
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        AOS.init({
            duration: 3000, // Duration of animations
        });

        baseUrl.get('/about', {
            headers: { 'Accept-Language': language },
        })
            .then(response => {
                setData(response.data.firstSection);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [language]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Function to toggle the full bio display
    const toggleBio = () => {
        setShowFullBio(prevState => !prevState);
    };

    // If `data.bio` is undefined or not a string, handle it safely
    const bio = data?.bio || '';
    // Split the bio into words and select the first 50 words for initial display
    const bioWords = bio.split(' ');
    const shortBio = bioWords.slice(0, 50).join(' '); // Join back into a string for display

    return (
        <div className='col-12 bg flex'>
            <div className="row about-dr-william col-10">
                <div className="col-md-6" data-aos="fade-right">
                    <div className="column-inner">
                        <div className="divider" style={{ height: '10px' }}></div>
                        <div className="animated slideInLeft">
                            <h4 className='S2Title' lang={language}>
                                {language === 'ar' ? `عن الدكتوره ${data?.name || ''}` : `About Dr ${data?.name || ''}`}
                            </h4>
                            <p className='S2Thin' lang={language}><em>{data?.title || ''}</em></p>
                        </div>
                        <div className="divider" style={{ height: '20px' }}></div>
                        <div className="inner-row">
                            <div className="col-12">
                                <div className="column-inner">
                                    {/* Conditionally render the full or short bio */}
                                    <p className="about-description" lang={language}>
                                        {showFullBio ? bio : `${shortBio}...`}
                                        {bioWords.length > 50 && (
                                            <button onClick={toggleBio} className="btn btn-link p-0">

                                                {language === 'ar' ?showFullBio ? 'قراءه اقل' : 'قراءه اكثر':showFullBio ? 'Read Less' : 'Read More' }
                                            </button>
                                        )}
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="divider" style={{ height: '40px' }}></div>
                        <a className="btn1 btn" href="/dr-william/" role="button">
                     {language==='ar' ? "معرفه المزيد" :" learn more"}
                        </a>
                    </div>
                </div>
                <div className="col-md-6 video-section" data-aos="fade-left">
                    <div className="column-inner">
                        <div className="nectar-video-box">
                            <div className="inner-wrap">
                                <a href="https://youtu.be/co_1cNJ-Oi8" className="full-link magnific-popup"></a>
                                <img
                                    decoding="async"
                                    width="2560"
                                    height="1710"
                                    src={DD}
                                    className="img-fluid radius"
                                    alt="Dr. William's Video Thumbnail"
                                    srcSet={DD}
                                    sizes="(max-width: 2560px) 100vw, 2560px"
                                />
                                <a href="https://youtu.be/co_1cNJ-Oi8" className="play_button_2 large nectar_video_lightbox magnific-popup">
                                    <span>
                                        <span className="play">
                                            <span className="inner-wrap inner flex">
                                                <FontAwesomeIcon className='playIcon' icon={faPlay} />
                                            </span>
                                        </span>
                                    </span>
                                </a>
                            </div>
                            <div className='Filter2'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutDrWilliam;
