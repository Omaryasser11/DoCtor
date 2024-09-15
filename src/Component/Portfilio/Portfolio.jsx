import React, { useEffect, useState, useRef, useContext } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import baseUrl from '../../BaseUrl';
import './Portfolio.scss';
import { LanguageContext } from '../../store/LanguageContext';
import Spinner from '../Spinner/Spinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

// Define the constants for tilt card
const ROTATION_RANGE = 32.5;

const TiltCard = ({ imageSrc, altText, onDelete }) => {
  useEffect(() => {
    AOS.init({ duration: 2500 });
  }, []);

  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x);
  const ySpring = useSpring(y);
  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width;
    const mouseY = (e.clientY - rect.top) / height;
    const rX = (mouseY - 0.75) * ROTATION_RANGE * -1.25;
    const rY = (mouseX - 0.75) * ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', transform }}
      className="TiltCard"
    >
      <div className="TiltCard-inner">
        <img src={imageSrc} alt={altText} className="imgW" />
        {onDelete && (
          <button className="delete-btn" onClick={onDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>
    </motion.div>
  );
};

const validationSchema = Yup.object({
  imageType: Yup.string().required('Required'),
  imageUrl: Yup.string().url('Invalid URL').required('Required'),
  procedureId: Yup.number().required('Required'),
});

function Portfolio() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { language } = useContext(LanguageContext);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 3000 });

    baseUrl
      .get('/before-after/images', {
        headers: { 'Accept-Language': language },
      })
      .then((response) => {
        const imageData = response.data.data.map((item) => ({
          id: item.id,
          imageUrl: item.imageUrl,
        }));
        setImages(imageData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [language]);

  const formik = useFormik({
    initialValues: {
      imageType: '',
      imageUrl: '',
      procedureId: 0,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');

      baseUrl
        .post('/before-after/images', values)
        .then(() => {
          resetForm();
          setLoading(false);
          toast.success('Item Added', { duration: 5000 });
          closeOverlay();
        })
        .catch((error) => {
          setLoading(false);
          setErrorMessage('Error submitting form.');
        });
    },
  });

  const handleDelete = (imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const previousImages = [...images];
      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));

      setLoading(true);
      baseUrl
        .delete(`/before-after/images/${imageId}`)
        .then(() => {
          toast.success('Image Deleted', { duration: 2000 });
        })
        .catch((error) => {
          setErrorMessage('Error deleting image: ' + (error.response?.data?.message || error.message));
          setImages(previousImages);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  function openOverlay() {
    setIsOverlayVisible(true);
  }

  function closeOverlay() {
    setIsOverlayVisible(false);
  }

  // Check for token
  const token = localStorage.getItem('token');

  if (loading) return <Spinner />;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="Portfolio col-12 flex Poto">
      {token ? (
        <>
          <div className="Last flex col-12" data-aos="fade-down-left">
            {images.map((image, index) => (
              <div key={image.id} className={`Q1 flexR`} data-aos={`fade-${index % 2 === 0 ? 'down-right' : 'up-right'}`}>
                <div className="layer position-absolute top-0 bottom-0 start-0 end-0 z-1"></div>
                <div className="btn-group dropend position-absolute top-0 end-0 z-2">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => handleDelete(image.id)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
                <TiltCard imageSrc={image.imageUrl} altText={`Image ${index + 1}`} onDelete={() => handleDelete(image.id)} />
              </div>
            ))}
            <div className="col-lg-3 col-sm-6 Q1 flex">
              <div
                className="cursor-pointer d-flex align-items-center justify-content-center w-100"
                style={{ height: '338px', width: '100%' }}
                onClick={openOverlay}
              >
                <i className="fa-solid fa-circle-plus text-body-tertiary iconAdd"></i>
              </div>
            </div>
          </div>

          {isOverlayVisible && (
            <div className="vh-100 montserrat row position-fixed z-5 overlay top-0 bottom-0 start-0 end-0 align-items-center justify-content-center">
              <div className="col-lg-6 col-sm-8 col-10 px-5">
                <div className="text-end mb-3">
                  <i className="fa-solid fa-xmark cursor-pointer fs-4 x" onClick={closeOverlay}></i>
                </div>
                <div className="bg-white p-4 text-dark-emphasis rounded-2 shadow-lg overflow-y-scroll mb-3">
                  <form onSubmit={formik.handleSubmit}>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="mb-3">
                      <label htmlFor="imageType" className="form-label">Image Type:</label>
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.imageType}
                        type="text"
                        name="imageType"
                        id="imageType"
                        className={`form-control ${formik.errors.imageType && formik.touched.imageType ? 'is-invalid' : ''}`}
                      />
                      {formik.errors.imageType && formik.touched.imageType && <div className="invalid-feedback">{formik.errors.imageType}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.imageUrl}
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        className={`form-control ${formik.errors.imageUrl && formik.touched.imageUrl ? 'is-invalid' : ''}`}
                      />
                      {formik.errors.imageUrl && formik.touched.imageUrl && <div className="invalid-feedback">{formik.errors.imageUrl}</div>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="procedureId" className="form-label">Procedure ID:</label>
                      <input
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.procedureId}
                        type="number"
                        name="procedureId"
                        id="procedureId"
                        className={`form-control ${formik.errors.procedureId && formik.touched.procedureId ? 'is-invalid' : ''}`}
                      />
                      {formik.errors.procedureId && formik.touched.procedureId && <div className="invalid-feedback">{formik.errors.procedureId}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? <Spinner /> : 'Submit'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='Portfolio col-12 flex Poto'>
          <div className='Last flex col-12' data-aos="fade-down-left">
            {images.map((image, index) => (
              <div key={index} className={`Q1 flexR`} data-aos={`fade-${index % 2 === 0 ? 'down-right' : 'up-right'}`}>
                <TiltCard
                  className="IMGOO"
                  imageSrc={image.imageUrl}
                  altText={`Image ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Portfolio;
