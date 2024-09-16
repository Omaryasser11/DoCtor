import React, { useState, useEffect } from 'react';
import './ContactSection.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
const ContactSection = () => {
    const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        sendCopy: true,
    });
    useEffect(() => {
        const handleScroll = () => {
            setIsFlipped(window.scrollY > -5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setIsFlipped]);
    const [contactInfo, setContactInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch contact info from the backend
        axios.get('http://dina-khairy.com/shared')
            .then(response => {
                setContactInfo(response.data.contactInfo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching contact info:', error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="contact-section flexA">


            <div className="container  flexA col-12 ">
                <div className="contact-wrapper col-10  flexA">


                    <div className="contact-info col-12  flexA">
                        <div className="contact-card col-lg-3 col-md-11">
                            <div className="icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="details">
                                <div className="title">Email</div>
                                <p>{contactInfo.email}</p>
                            </div>
                        </div>
                        <div className="contact-card col-lg-3 col-md-11">
                            <div className="icon">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <div className="details">
                                <div className="title">Address</div>
                                <p>{contactInfo.address}</p>
                            </div>
                        </div>
                        <div className="contact-card col-lg-3 col-md-11">
                            <div className="icon">
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="details">
                                <div className="title">Phone</div>
                                <p>{contactInfo.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="map" className="relative">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3631.662247725229!2d39.6555750748141!3d24.4625008610674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15bd95840b62c695%3A0x4417e97f577e8524!2sDMAI4383%2C%204383%20Jabbar%20Ibn%20Sakhr%2C%207981%2C%20Al%20Khalidiyyah%2C%20Madinah%2042317%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1726443205628!5m2!1sen!2sus"
                    loading="lazy"
                    allowFullScreen
                    title="Map"
                />
            </div>


        </section>
    );
};

export default ContactSection;
