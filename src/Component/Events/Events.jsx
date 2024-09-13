import React, { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useRecoilState } from 'recoil';
import { LanguageContext } from '../../store/LanguageContext';
import { isFlippedState } from '../../store/index.js';
import { Modal } from 'react-bootstrap'; // Import Bootstrap Modal
import style from '../Videos/Videos.module.css'; // Correct import for CSS module
import LandingVideo from '../../assets/كارت 2.png'; // Update with the correct path
import IMG1 from "../../assets/Events/IMG1.jpg";
import IMG2 from "../../assets/Events/IMG2.jpg";

const Events = ({ openVideo }) => {
    const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const handleScroll = () => {
            setIsFlipped(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setIsFlipped]);

    // Define video data with content in both languages
    const videoData = [
        {
            imgSrc: 'https://beinspiration.pl/wp-content/uploads/2020/07/projekt-bez-tytulu7-2.png',
            title: {
                en: 'Irena Eris factory in Poland 🇵🇱',
                ar: 'مصنع إيرينا إريس في بولندا 🇵🇱'
            },
            date: {
                en: 'August 2024',
                ar: 'أغسطس 2024'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: 'https://www.gennaichirurgia.it/wp-content/uploads/2023/12/IMCAS-World-Congress-2024-cover.jpg',
            title: {
                en: 'IMCAS conference',
                ar: 'مؤتمر IMCAS'
            },
            date: {
                en: 'February 2023',
                ar: 'فبراير 2023'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: 'https://media.licdn.com/dms/image/D4E22AQH6y6jTAWQusQ/feedshare-shrink_800/0/1699609274966?e=2147483647&v=beta&t=kmI56NFqU0SiTpz6CBtVoOLY2wLJvneM5qDQgT0lKYY',
            title: {
                en: 'Merz expertsummit middle east&north Africa',
                ar: 'قمة خبراء ميرز في الشرق الأوسط وشمال أفريقيا'
            },
            date: {
                en: 'October 2023',
                ar: 'أكتوبر 2023'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: 'https://sapphiremedicalaesthetics.co.uk/wp-content/uploads/2019/07/juvederm-fillers.jpg',
            title: {
                en: 'Juvederm MDCodes Dubai city',
                ar: 'مدينة دبي كودات MDCodes لجوفيرديرم'
            },
            date: {
                en: 'October 2022',
                ar: 'أكتوبر 2022'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: 'https://www.drnabilfakih.com/images/l/new-nabil-last-3840.jpg',
            title: {
                en: 'Hands on training for biostimulators injection at Nabil faqih Training clinic',
                ar: 'تدريب عملي على حقن المحفزات البيولوجية في عيادة نabil faqih'
            },
            date: {
                en: 'July 2022',
                ar: 'يوليو 2022'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: IMG1,
            title: {
                en: 'June 2022 Cadaver course at Istanbul mortuary',
                ar: 'دورة تشريح في إسطنبول يونيو 2022'
            },
            date: {
                en: 'Learn more about this event by visiting the official website or watching the promotional video.',
                ar: 'تعلم المزيد عن هذا الحدث من خلال زيارة الموقع الرسمي أو مشاهدة الفيديو الترويجي.'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: 'https://imgv2-1-f.scribdassets.com/img/document/423445903/original/142b53cd86/1719535180?v=1',
            title: {
                en: 'IMCAS Asia 2019, Bali Westin Resort Nusa Dua - Bali',
                ar: 'IMCAS آسيا 2019، منتجع ويستن نوسا دوا - بالي'
            },
            date: {
                en: 'July 2019',
                ar: 'يوليو 2019'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        },
        {
            imgSrc: IMG2,
            title: {
                en: 'Saudi Derm: Advancing Dermatology Care and Research',
                ar: 'Derm السعودي: تعزيز رعاية وأبحاث الجلدية'
            },
            date: {
                en: 'Feb 2019',
                ar: 'فبراير 2019'
            },
            url: 'https://www.plasticsurgery.org/events/limitless-leaders-summit-2025'
        }
    ];

    const handleImageClick = (imgSrc) => {
        setCurrentImage(imgSrc);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentImage('');
    };

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Upcoming Events & Activities' : 'الأحداث والأنشطة القادمة'}</title>
            </Helmet>
            <div className="montserrat">
                {/* Header */}
                <div className="VVVV row rowW gx-0 position-relative blueC mb-2" style={{ height: '318px' }}>
                    <img className="landingVideo col-12" src={LandingVideo} alt="Landing Video" />
                    <div className="filterContainer col-12">
                        <div className="container d-flex align-items-center justify-content-center h-100">
                            <div className="mt-3 d-flex align-items-end position-absolute z-3 text-center justify-content-center" style={{ height: '200px' }}>
                                <h4 className="fs-1 fw-semibold text-white">{language === 'en' ? 'Upcoming Events & Activities' : 'الأحداث والأنشطة القادمة'}</h4>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body of videos */}
                <div className="row gx-0 d-flex flex-wrap mt-n1 mr-n1 ms-n1 flex-row align-content-center justify-content-center align-items-start">
                    <div className="offset-1 col-10 px-4 ms-0">
                        <div className="text-center my-5">
                            <p lang={language} className={`text-dark-emphasis fw-semibold mb-0 ${style.font}`}>
                                {language === 'en' ? 'Join our latest medical event!' : 'انضم لأحدث حدث طبي!'}
                            </p>
                            <p className="fs-5 text-body-tertiary fw-bold text-uppercase">
                                {language === 'en' ? 'Watch on YouTube, Spotify, and Apple Podcast.' : 'شاهد على يوتيوب، سبوتيفاي، وآبل بودكاست.'}
                            </p>
                        </div>
                        <div className="row g-5">
                            {videoData.map((video, index) => (
                                <div className="col-lg-4" key={index}>
                                    <div className="card border-0 " >
                                        <img
                                            style={{ height: "550px", cursor: 'pointer' }}
                                            src={video.imgSrc}
                                            className="card-img-top"
                                            alt={video.title[language]}
                                            onClick={() => handleImageClick(video.imgSrc)}

                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{video.title[language]}</h5>
                                            <p className="card-text">{video.date[language]}</p>
                                            <a href={video.url} className="btn1 btn">
                                                {language === 'en' ? 'Learn more' : 'اقرأ المزيد'}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modal for image */}
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                    <Modal.Body>
                        <img src={currentImage} alt="Modal content" className="img-fluid" />
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Events;
