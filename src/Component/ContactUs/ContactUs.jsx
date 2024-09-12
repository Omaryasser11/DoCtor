import React, { useState, useEffect } from 'react';
import './ContactSection.scss';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        sendCopy: true,
    });

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
        <section className="contact-section flex">
            <div id="map" className="relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=..."
                    loading="lazy"
                    allowFullScreen
                    title="Map"
                />
            </div>

            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-form">
                        <form onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required
                                />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email address"
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>

                            <div className="relative">
                                <textarea
                                    id="message"
                                    rows="3"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Message"
                                    required
                                />
                                <label htmlFor="message">Message</label>
                            </div>

                            <div className="checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id="sendCopy"
                                    checked={formData.sendCopy}
                                    onChange={handleChange}
                                />
                                <label htmlFor="sendCopy">Send me a copy of this message</label>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Send
                            </button>
                        </form>
                    </div>

                    <div className="contact-info">
                        <div className="contact-card">
                            <div className="icon">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="details">
                                <div className="title">Email</div>
                                <p>{contactInfo.email}</p>
                            </div>
                        </div>
                        <div className="contact-card">
                            <div className="icon">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                            </div>
                            <div className="details">
                                <div className="title">Address</div>
                                <p>{contactInfo.address}</p>
                            </div>
                        </div>
                        <div className="contact-card">
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
        </section>
    );
};

export default ContactSection;
