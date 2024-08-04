import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PodcastSection.scss'; // Import the SCSS file

const PodcastSection = () => {
    return (
        <div className=' flex col-12 full-width-section3  row  vc-row-equal-height vc-row-flex vc-row-content-middle'
            id="fws_66a6b014267df">


            <div className=" flexR col-10" >
                <div className="col-10 col-md-6 d-flex align-items-center">
                    <div className="nectar-post-grid-wrap text-color-light spacing-none">

                        <div className="nectar-post-grid">
                            <div className="nectar-post-grid-item animated-in" data-post-id="134865">
                                <div className="inner">
                                    <div className="nectar-post-grid-item-bg-wrap">
                                        <div className="nectar-post-grid-item-bg">
                                            <img
                                                src="https://www.drwilliammiami.com/wp-content/uploads/2022/06/Blog-BTM-Podcast.jpg"
                                                alt="Podcast Thumbnail"
                                                className="img-fluid"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-overlay" style={{ backgroundColor: '#000000', opacity: 0.3 }}></div>
                                    <div className="content">
                                        <a
                                            className="nectar-post-grid-link"
                                            href="https://www.drwilliammiami.com/behind-the-mask-the-podcast/"
                                            aria-label="Behind The Mask, The Podcast"
                                        />
                                        <div className="item-main">
                                            <h3 className="post-heading">
                                                <a href="https://www.drwilliammiami.com/behind-the-mask-the-podcast/">
                                                    <span>Behind The Mask, The Podcast</span>
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 text-center">
                    <h4>
                        <a href="https://www.youtube.com/c/DrWilliamMiami?sub_confirmation=1">
                            Behind the Mask - The Podcast
                        </a>
                    </h4>
                    <p>
                        Behind the Mask is now also a Podcast! Available on{' '}
                        <a href="https://www.youtube.com/c/DrWilliamMiami">YouTube</a>,{' '}
                        <a href="https://open.spotify.com/show/1YFWASXlUUHuMquo8Auzd2?si=f1f6f024c74f4304">Spotify</a>, and{' '}
                        <a href="https://podcasts.apple.com/us/podcast/behind-the-mask-the-podcast/id1628860294">Apple Podcast</a>. Dr. William kicked off another endeavor to keep you all updated on the latest in plastic surgery, debunk myths and misconceptions, and make sure every patient who gets wheeled into surgery is educated and aware.
                        <br />
                        <strong>You don’t want to miss any episodes!</strong>
                    </p>
                    <div className="divider"></div>
                    <a
                        href="https://www.youtube.com/c/DrWilliamMiami?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nectar-3d-transparent-button"
                    >
                        <span className="hidden-text">Subscribe Now</span>
                        <div className="inner-wrap">
                            <div className="front-3d">
                                <svg viewBox="0 0 192.71250915527344 54">
                                    <defs>
                                        <mask id="button-text-mask-0">
                                            <rect width="100%" height="100%" fill="#ffffff"></rect>
                                            <text className="mask-text button-text" fill="#000000" textAnchor="middle" fontSize="16">
                                                Subscribe Now
                                            </text>
                                        </mask>
                                    </defs>
                                    <rect fill="#00718b" width="100%" height="100%"></rect>
                                </svg>
                            </div>
                            <div className="back-3d">
                                <svg viewBox="0 0 192.71250915527344 54">
                                    <rect stroke="#00718b" strokeWidth="8" fill="transparent" width="100%" height="100%"></rect>
                                    <text className="button-text" fill="#00718b" textAnchor="middle" fontSize="16">
                                        Subscribe Now
                                    </text>
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PodcastSection;
