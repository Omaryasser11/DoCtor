import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../store/LanguageContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PodcastSection.scss'; // Import the SCSS file
import FlashButton from '../Buttons/FlashButton';
import pod from "../../assets/-5945261535951699161_121 (1).jpg"

const PodcastSection = () => {
    const { language } = useContext(LanguageContext);

    return (
        <div className=' flex col-12 full-width-section3  row  vc-row-equal-height vc-row-flex vc-row-content-middle'
            id="fws_66a6b014267df">


            <div className=" flexR col-10" style={{ gap: '1.5rem' }} >
                <div className="col-10 col-md-6 d-flex align-items-center" >
                    <div className="nectar-post-grid-wrap text-color-light spacing-none">

                        <div className="nectar-post-grid">
                            <div className="nectar-post-grid-item animated-in" data-post-id="134865">
                                <div className="inner">
                                    <div className="nectar-post-grid-item-bg-wrap">
                                        <div className="nectar-post-grid-item-bg Realative">


                                            <div className='ImgBoodcast'>

                                            </div>
                                            <div className='Filter'>
                                                {/* <div className="item-main">
                                                    <h3 className="post-heading">
                                                        <a href="https://www.drwilliammiami.com/behind-the-mask-the-podcast/">
                                                            <span>Behind The Mask, The Podcast</span>
                                                        </a>
                                                    </h3>
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>
                                    <div className="bg-overlay" style={{ backgroundColor: '#000000', opacity: 0.3 }}></div>
                                    <div className="content">
                                        <a
                                            className="nectar-post-grid-link"
                                            href="https://www.drwilliammiami.com/behind-the-mask-the-podcast/"
                                            aria-label="Behind The Mask, The Podcast"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6 text-center content2">
                    <h4  className='S2Title' lang={language}>
                      
                            {language === 'ar'
                                ? 'وراء القناع - البودكاست'
                                : 'Behind the Mask - The Podcast'
                            }
               
                    </h4>
                    <div className="divider" style={{ height: '20px' }}></div>
                    <p
                        lang={language}
                        className="about-description"
                    >
                        {language === 'ar'
                            ? (
                                <>

                                    وراء القناع أصبح الآن أيضًا بودكاست! متاح على{' '}
                                    <a href="https://www.youtube.com/c/DrWilliamMiami">يوتيوب</a>،{' '}
                                    <a href="https://open.spotify.com/show/1YFWASXlUUHuMquo8Auzd2?si=f1f6f024c74f4304">سبوتيفاي</a>، و{' '}
                                    <a href="https://podcasts.apple.com/us/podcast/behind-the-mask-the-podcast/id1628860294">آبل بودكاست</a>.
                                    بدأ الدكتور ويليام مسعى آخر ليبقيكم جميعًا على اطلاع بأحدث التطورات في جراحة التجميل، وكشف الأساطير والمفاهيم الخاطئة، وضمان أن كل مريض يدخل غرفة العمليات يكون على دراية ومطلع.
                                    <br />
                                    <strong>لا تفوتوا أي حلقة!</strong>
                                </>

                            )
                            : (
                                <>

                                    Behind the Mask is now also a Podcast! Available on{' '}
                                    <a href="https://www.youtube.com/c/DrWilliamMiami">YouTube</a>,{' '}
                                    <a href="https://open.spotify.com/show/1YFWASXlUUHuMquo8Auzd2?si=f1f6f024c74f4304">Spotify</a>, and{' '}
                                    <a href="https://podcasts.apple.com/us/podcast/behind-the-mask-the-podcast/id1628860294">Apple Podcast</a>. Dr. William kicked off another endeavor to keep you all updated on the latest in plastic surgery, debunk myths and misconceptions, and make sure every patient who gets wheeled into surgery is educated and aware.
                                    <br />
                                    <strong>You don’t want to miss any episodes!</strong>

                                </>
                            )
                        }

                    </p>

                    <div className="divider" style={{ height: '30px' }}></div>

                    <FlashButton />

                </div>
            </div>
        </div >
    );
};

export default PodcastSection;
