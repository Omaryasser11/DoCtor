import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.scss'; // Import the SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import DD from "../../assets/Youtube Thumbnail DINA.png"
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
const AboutDrWilliam = () => {
    useEffect(() => {
        AOS.init({
            duration: 3000, // Duration of animations
            // You can add more AOS options here
          });
    }, []);
    return (
        <div className='col-12 bg flex'>
            <div className="row about-dr-william col-10">
                <div className="col-md-6" data-aos="fade-right">
                    <div className="column-inner">
                        <div className="divider" style={{ height: '10px' }}></div>
                        <div className="animated slideInLeft">
                            <h4 className='S2Title'>About Dr. Dina</h4>
                            <p className='S2Thin'><em>Board Certified Plastic Surgeon in South Florida</em></p>
                        </div>
                        <div className="divider" style={{ height: '20px' }}></div>
                        <div className="inner-row">
                            <div className="col-12">
                                <div className="column-inner">
                                    <p className="about-description">
                                        Dr. Dina is an Egyption plastic surgeon who is certified by the American Board of Plastic Surgery.
                                        Dr. Dina completed seven years of general surgical training in Michigan following his undergraduate
                                        and medical school training in Canada, and then completed a three-year residency in plastic surgery at
                                        the prestigious Duke University. Dr. William has lived and worked in the United States for over twenty
                                        years, and lives in South Florida with his wife and three sons.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="divider" style={{ height: '40px' }}></div>
                        <a
                            className="btn1 btn"
                            href="/dr-william/"
                            role="button"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
                <div className="col-md-6  video-section" data-aos="fade-left">
                    <div className="column-inner">
                        <div className="nectar-video-box">
                            <div className="inner-wrap">
                                <a
                                    href="https://youtu.be/co_1cNJ-Oi8"
                                    className="full-link magnific-popup"
                                ></a>
                                <img
                                    decoding="async"
                                    width="2560"
                                    height="1710"
                                    src={DD}
                                    className="img-fluid radius"
                                    alt=""
                                    srcSet={DD}
                                    sizes="(max-width: 2560px) 100vw, 2560px"
                                />
                                <a
                                    href="https://youtu.be/co_1cNJ-Oi8"
                                    className="play_button_2 large nectar_video_lightbox magnific-popup"
                                >
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