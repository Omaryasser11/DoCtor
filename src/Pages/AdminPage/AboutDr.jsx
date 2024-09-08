import React, { useState, useEffect } from 'react';
import axiosInstance from '../../BaseUrl'; // Custom Axios instance
import './LandingSection.scss';

const LandingSection = () => {
  const [data, setData] = useState({
    firstSection: {
      nameAr: '',
      nameEn: '',
      titleAr: '',
      titleEn: '',
      quoteAr: '',
      quoteEn: '',
      bioAr: '',
      bioEn: ''
    },
    secondSection: {
      headerAr: '',
      headerEn: '',
      bodyAr: '',
      bodyEn: '',
      imageUrl: ''
    },
    thirdSection: {
      headerAr: '',
      headerEn: '',
      bodyAr: '',
      bodyEn: '',
      imageUrl: ''
    },
    fourthSection: {
      headerAr: '',
      headerEn: '',
      bodyAr: '',
      bodyEn: '',
      imageUrls: ''
    }
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    axiosInstance.get('/about')
      .then(response => {
        const fetchedData = {
          ...response.data,
          fourthSection: {
            ...response.data.fourthSection,
            imageUrls: response.data.fourthSection.imageUrls.join(', ')
          }
        };
        setData(fetchedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formattedData = {
      firstSection: {
        ...data.firstSection
      },
      secondSection: {
        ...data.secondSection
      },
      thirdSection: {
        ...data.thirdSection
      },
      fourthSection: {
        ...data.fourthSection,
        imageUrls: data.fourthSection.imageUrls.split(',').map(url => url.trim())
      }
    };

    axiosInstance.put('/about', formattedData)
      .then(response => {
        setData(response.data);
        alert('Data updated successfully');
        setEditMode(false);
      })
      .catch(error => console.error('Error updating data:', error));
  };

  const handleDelete = () => {
    // DELETE request
    axiosInstance.delete('/about')
      .then(() => {
        setData({
          firstSection: {
            nameAr: '',
            nameEn: '',
            titleAr: '',
            titleEn: '',
            quoteAr: '',
            quoteEn: '',
            bioAr: '',
            bioEn: ''
          },
          secondSection: {
            headerAr: '',
            headerEn: '',
            bodyAr: '',
            bodyEn: '',
            imageUrl: ''
          },
          thirdSection: {
            headerAr: '',
            headerEn: '',
            bodyAr: '',
            bodyEn: '',
            imageUrl: ''
          },
          fourthSection: {
            headerAr: '',
            headerEn: '',
            bodyAr: '',
            bodyEn: '',
            imageUrls: ''
          }
        });
        alert('Data deleted successfully');
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  const handleChange = (e, section, field) => {
    setData({
      ...data,
      [section]: {
        ...data[section],
        [field]: e.target.value
      }
    });
  };

  return (
    <div className="landing-section">
      <h1>Edit Landing Section</h1>
      {editMode ? (
        <form onSubmit={handleUpdate} className="edit-form">

          {/* First Section */}
          <div className="section">
            <h2>First Section</h2>
            <input
              type="text"
              value={data.firstSection.nameAr}
              onChange={(e) => handleChange(e, 'firstSection', 'nameAr')}
              placeholder="Name (Arabic)"
              required
            />
            <input
              type="text"
              value={data.firstSection.nameEn}
              onChange={(e) => handleChange(e, 'firstSection', 'nameEn')}
              placeholder="Name (English)"
              required
            />
            <input
              type="text"
              value={data.firstSection.titleAr}
              onChange={(e) => handleChange(e, 'firstSection', 'titleAr')}
              placeholder="Title (Arabic)"
              required
            />
            <input
              type="text"
              value={data.firstSection.titleEn}
              onChange={(e) => handleChange(e, 'firstSection', 'titleEn')}
              placeholder="Title (English)"
              required
            />
            <input
              type="text"
              value={data.firstSection.quoteAr}
              onChange={(e) => handleChange(e, 'firstSection', 'quoteAr')}
              placeholder="Quote (Arabic)"
              required
            />
            <input
              type="text"
              value={data.firstSection.quoteEn}
              onChange={(e) => handleChange(e, 'firstSection', 'quoteEn')}
              placeholder="Quote (English)"
              required
            />
            <textarea
              value={data.firstSection.bioAr}
              onChange={(e) => handleChange(e, 'firstSection', 'bioAr')}
              placeholder="Bio (Arabic)"
              required
            />
            <textarea
              value={data.firstSection.bioEn}
              onChange={(e) => handleChange(e, 'firstSection', 'bioEn')}
              placeholder="Bio (English)"
              required
            />
          </div>

          {/* Second Section */}
          <div className="section">
            <h2>Second Section</h2>
            <input
              type="text"
              value={data.secondSection.headerAr}
              onChange={(e) => handleChange(e, 'secondSection', 'headerAr')}
              placeholder="Header (Arabic)"
              required
            />
            <input
              type="text"
              value={data.secondSection.headerEn}
              onChange={(e) => handleChange(e, 'secondSection', 'headerEn')}
              placeholder="Header (English)"
              required
            />
            <textarea
              value={data.secondSection.bodyAr}
              onChange={(e) => handleChange(e, 'secondSection', 'bodyAr')}
              placeholder="Body (Arabic)"
              required
            />
            <textarea
              value={data.secondSection.bodyEn}
              onChange={(e) => handleChange(e, 'secondSection', 'bodyEn')}
              placeholder="Body (English)"
              required
            />
            <input
              type="text"
              value={data.secondSection.imageUrl}
              onChange={(e) => handleChange(e, 'secondSection', 'imageUrl')}
              placeholder="Image URL"
              required
            />
          </div>

          {/* Third Section */}
          <div className="section">
            <h2>Third Section</h2>
            <input
              type="text"
              value={data.thirdSection.headerAr}
              onChange={(e) => handleChange(e, 'thirdSection', 'headerAr')}
              placeholder="Header (Arabic)"
              required
            />
            <input
              type="text"
              value={data.thirdSection.headerEn}
              onChange={(e) => handleChange(e, 'thirdSection', 'headerEn')}
              placeholder="Header (English)"
              required
            />
            <textarea
              value={data.thirdSection.bodyAr}
              onChange={(e) => handleChange(e, 'thirdSection', 'bodyAr')}
              placeholder="Body (Arabic)"
              required
            />
            <textarea
              value={data.thirdSection.bodyEn}
              onChange={(e) => handleChange(e, 'thirdSection', 'bodyEn')}
              placeholder="Body (English)"
              required
            />
            <input
              type="text"
              value={data.thirdSection.imageUrl}
              onChange={(e) => handleChange(e, 'thirdSection', 'imageUrl')}
              placeholder="Image URL"
              required
            />
          </div>

          {/* Fourth Section */}
          <div className="section">
            <h2>Fourth Section</h2>
            <input
              type="text"
              value={data.fourthSection.headerAr}
              onChange={(e) => handleChange(e, 'fourthSection', 'headerAr')}
              placeholder="Header (Arabic)"
              required
            />
            <input
              type="text"
              value={data.fourthSection.headerEn}
              onChange={(e) => handleChange(e, 'fourthSection', 'headerEn')}
              placeholder="Header (English)"
              required
            />
            <textarea
              value={data.fourthSection.bodyAr}
              onChange={(e) => handleChange(e, 'fourthSection', 'bodyAr')}
              placeholder="Body (Arabic)"
              required
            />
            <textarea
              value={data.fourthSection.bodyEn}
              onChange={(e) => handleChange(e, 'fourthSection', 'bodyEn')}
              placeholder="Body (English)"
              required
            />
            <input
              type="text"
              value={data.fourthSection.imageUrls}
              onChange={(e) => handleChange(e, 'fourthSection', 'imageUrls')}
              placeholder="Image URLs (comma-separated)"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>

          </div>
        </form>
      ) : (
        <>
          <h2>{data.firstSection.nameEn}</h2>
          {/* Display other sections */}
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button type="button" onClick={handleDelete}>Delete Data</button>
        </>
      )}
    </div>
  );
};

export default LandingSection;
