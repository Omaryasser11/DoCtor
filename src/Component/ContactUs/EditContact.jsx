import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faPhone, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row, Alert, Spinner } from 'reactstrap';
import './EditContact.scss';
import Baseurl from '../../BaseUrl'; // Import base URL
import { isFlippedState } from '../../store/index.js';
import { useRecoilState } from 'recoil';
const EditContact = () => {

    useEffect(() => {
        const handleScroll = () => {
            setIsFlipped(window.scrollY > -5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setIsFlipped]);
    const [isFlipped, setIsFlipped] = useRecoilState(isFlippedState);
    const [contactInfo, setContactInfo] = useState({
        email: '',
        addressAr: '',
        addressEn: '',
        phone: '',
    });
    const [socialLinks, setSocialLinks] = useState({
        onlyFans: '',
        facebook: '',
        youtube: '',
        instagram: '',
        tiktok: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Fetch contact info and social links from the backend on mount
    useEffect(() => {
        Baseurl.get('/shared')
            .then(response => {
                const { contactInfo, socialLinks } = response.data;
                setContactInfo({
                    email: contactInfo.email || '',
                    addressAr: contactInfo.address || '',
                    addressEn: contactInfo.address || '',
                    phone: contactInfo.phone || '',
                });
                setSocialLinks({
                    onlyFans: socialLinks.onlyFans || '',
                    facebook: socialLinks.facebook || '',
                    youtube: socialLinks.youtube || '',
                    instagram: socialLinks.instagram || '',
                    tiktok: socialLinks.tiktok || '',
                });
                setLoading(false);
            })
            .catch(() => {
                setError('Error fetching data. Please try again.');
                setLoading(false);
            });
    }, []);

    // Handle changes for both contact info and social links
    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id in contactInfo) {
            setContactInfo(prev => ({ ...prev, [id]: value }));
        } else if (id in socialLinks) {
            setSocialLinks(prev => ({ ...prev, [id]: value }));
        }
    };

    // Handle PUT request to update contact info and social links
    const handleUpdate = () => {
        const updatedData = { contactInfo, socialLinks };

        Baseurl.put('/shared', updatedData)
            .then(() => {
                setSuccessMessage('Data updated successfully!');
                setError(null);
                setIsEditing(false);
            })
            .catch(() => {
                setError('Failed to update data. Please try again.');
            });
    };

    // Toggle edit mode
    const toggleEdit = () => {
        setIsEditing(prev => !prev);
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spinner color="primary" />
            </div>
        );
    }

    return (
        <Container className="contact-section flex1">
            {/* Error and Success Notifications */}
            {error && <Alert color="danger">{error}</Alert>}
            {successMessage && <Alert color="success">{successMessage}</Alert>}

            <Row className="mt-4 d-flex justify-content-center">


                <Col md={8}>
                    <Form>
                        {/* Editable Contact Info */}
                        {[
                            { label: "Email", icon: faEnvelope, id: "email", type: "email", value: contactInfo.email },
                            { label: "Address (Arabic)", icon: faMapMarkerAlt, id: "addressAr", type: "text", value: contactInfo.addressAr },
                            { label: "Address (English)", icon: faMapMarkerAlt, id: "addressEn", type: "text", value: contactInfo.addressEn },
                            { label: "Phone", icon: faPhone, id: "phone", type: "text", value: contactInfo.phone },
                        ].map(field => (
                            <FormGroup key={field.id}>
                                <Label for={field.id}>
                                    <FontAwesomeIcon icon={field.icon} /> {field.label}
                                    <FontAwesomeIcon icon={faEdit} onClick={toggleEdit} className="ml-2 edit-icon" />
                                </Label>
                                <Input
                                    type={field.type}
                                    id={field.id}
                                    value={field.value}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                />
                            </FormGroup>
                        ))}

                        {/* Editable Social Links */}
                        {[
                            { label: "Snapchat", id: "onlyFans", value: socialLinks.onlyFans },
                            { label: "Facebook", id: "facebook", value: socialLinks.facebook },
                            { label: "YouTube", id: "youtube", value: socialLinks.youtube },
                            { label: "Instagram", id: "instagram", value: socialLinks.instagram },
                            { label: "TikTok", id: "tiktok", value: socialLinks.tiktok },
                        ].map(link => (
                            <FormGroup key={link.id}>
                                <Label for={link.id}>
                                    {link.label}
                                    <FontAwesomeIcon icon={faEdit} onClick={toggleEdit} className="ml-2 edit-icon" />
                                </Label>
                                <Input
                                    type="text"
                                    id={link.id}
                                    value={link.value}
                                    onChange={handleChange}
                                    readOnly={!isEditing}
                                />
                            </FormGroup>
                        ))}

                        {isEditing && (
                            <Button color="primary" onClick={handleUpdate}>
                                Save Changes
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default EditContact;
