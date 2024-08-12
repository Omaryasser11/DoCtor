import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './About.scss'; // Import the SCSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
const AboutDrWilliam = () => {
    return (
<div className='col-12 bg flex'>
<div className="row about-dr-william col-10">
            <div className="col-md-6 animated fade-in">
                <div className="column-inner">
                    <div className="divider" style={{ height: '10px' }}></div>
                    <div className="animated slideInLeft">
                        <h4 className='S2Title'>About Dr. William</h4>
                        <p className='S2Thin'><em>Board Certified Plastic Surgeon in South Florida</em></p>
                    </div>
                    <div className="divider" style={{ height: '20px' }}></div>
                    <div className="inner-row">
                        <div className="col-12">
                            <div className="column-inner">
                                <p className="about-description">
                                    Dr. William is an American plastic surgeon who is certified by the American Board of Plastic Surgery.
                                    Dr. William completed seven years of general surgical training in Michigan following his undergraduate
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
            <div className="col-md-6 animated fade-in video-section">
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
                                src="https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-scaled.jpg"
                                className="img-fluid radius"
                                alt=""
                                srcSet="https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-scaled.jpg 2560w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-300x200.jpg 300w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-1024x684.jpg 1024w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-768x513.jpg 768w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-1536x1026.jpg 1536w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-2048x1368.jpg 2048w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-900x600.jpg 900w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-675x450.jpg 675w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-600x401.jpg 600w, https://www.drwilliammiami.com/wp-content/uploads/2024/03/DSC07636-150x100.jpg 150w"
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
                    </div>
                </div>
            </div>
        </div>
</div>
    );
};

export default AboutDrWilliam;