import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../BaseUrl';
import './LandingSection.scss';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const LandingSectionForm = () => {
  const [formData, setFormData] = useState({
    firstSection: {
      nameAr: "دينا خيري",
      nameEn: "Dina Khairy",
      titleAr: "استشاري الجلديه و التجميل والليزر",
      titleEn: "Consultant Of Dermatology, Laser And Aesthetic Medicine",
      quoteAr: "عندما كنت صغيرًا، كنت أرغب في أن أصبح جراحًا تجميليًا.",
      quoteEn: "When I was little, I wanted to be a plastic surgeon.",
      bioAr: "كعضو في المجلس الكندي للطب التجميلي (CBAM) والجمعية الأوروبية لطب الجلد التجميلي والليزر (ESCAD)، أنا معتمد في الإجراءات التجميلية المتقدمة وأتخصص في العلاجات غير الجراحية. ألتزم بالتميز في الطب التجميلي، مع خبرة في العلاجات بالليزر وحلول العناية بالبشرة. أقدم خطط علاج مخصصة تركز على سلامة المرضى ورضاهم، مع تحديث مهاراتي بانتظام بأحدث التقنيات. تقدم ممارستي حلولاً تجميلية متطورة، وتعزز النتائج الطبيعية والشبابية. معترف به لاحترافيتي وخبرتي، أكرس نفسي للرعاية الشخصية والاستشارات، أشارك في البحث والتطوير المستمر، وأدافع عن الأساليب المبتكرة في الطب التجميلي",
      bioEn: "As a member of the Canadian Board of Aesthetic Medicine (CBAM) and the European Society for Cosmetic and Aesthetic Dermatology (ESCAD), I am certified in advanced aesthetic procedures and specialize in non-surgical treatments. I am committed to excellence in aesthetic medicine, with expertise in laser therapies and skincare solutions. I provide customized treatment plans focused on patient safety and satisfaction, continually updating my skills with the latest techniques. My practice offers state-of-the-art aesthetic solutions, promoting natural and youthful results. Recognized for professionalism and expertise, I am dedicated to personalized care and consultations, participate in ongoing research and development, and advocate for innovative approaches in aesthetic medicine.",
    },
    secondSection: {
      headerAr: "احترافيه دكتور دينا خيري في عالم التجميل",
      headerEn: "The professionalism of Dr. Dina Khairy in the world of cosmetics",
      bodyAr: "دكتورة متخصصة في الجلدية والتجميل هي ليست فقط خبيرة في علاج مشكلات البشرة، بل هي أيضًا فنانة تهتم بجمال وصحة الجلد. تجمع بين العلم والفن لتقديم حلول مبتكرة، تهدف إلى تعزيز ثقة المرضى بأنفسهم، ومساعدتهم في الحصول على بشرة صحية ومظهر طبيعي. سواء كان الأمر يتعلق بعلاج الأمراض الجلدية أو تحسين مظهر البشرة من خلال الإجراءات التجميلية، فإنها تقدم رعاية متكاملة تعتمد على أحدث التقنيات الطبية والعلمية",
      bodyEn: "A dermatologist and cosmetic doctor is not only an expert in treating skin conditions but also an artist dedicated to enhancing the beauty and health of the skin. She combines science and art to provide innovative solutions, aiming to boost patients' confidence and help them achieve healthy, natural-looking skin. Whether it's treating dermatological issues or improving skin appearance through cosmetic procedures, she offers comprehensive care based on the latest medical and scientific advancements.",
      imageUrl: "https://i.imghippo.com/files/4vhMX1725822456.png",
    },
    thirdSection: {
      headerAr: "لمسات الدكتورة في الفيلر والبوتكس ونضارة البشرة وعلاج تقدم العمر والعنايه بالبشرة والشعر",
      headerEn: "Doctor's touches on fillers, Botox, skin care, anti-aging treatment, and hair care",
      bodyAr: "تتميز لمسات الدكتورة في مجال الفيلر والبوتكس بأنها دقيقة واحترافية، حيث تعمل على تحقيق نتائج طبيعية تعزز من جمال الملامح وتمنح الوجه مظهراً شاباً ومتجدداً. تهتم أيضاً بنضارة البشرة من خلال تقديم علاجات متقدمة لتحسين ملمس ولون البشرة، مما يعيد إليها إشراقها وحيويتها. في علاج تقدم العمر، تقدم الدكتورة حلولاً شاملة تعتمد على تقنيات طبية حديثة تساعد في تخفيف علامات الشيخوخة بشكل فعال. كما تقدم العناية المتخصصة بالبشرة والشعر، لضمان الحفاظ على مظهر صحي ومتألق، مع مراعاة احتياجات كل مريض بشكل فردي",
      bodyEn: "The doctor’s touch in fillers and Botox is precise and professional, delivering natural results that enhance facial features and give a youthful, refreshed appearance. She also focuses on skin rejuvenation through advanced treatments that improve skin texture and tone, restoring its radiance and vitality. For anti-aging, the doctor offers comprehensive solutions using modern medical techniques to effectively reduce the signs of aging. Additionally, she provides specialized care for both skin and hair, ensuring a healthy and radiant look while addressing each patient's individual needs",
      imageUrl: "https://i.imghippo.com/files/AOUSu1725822562.jpg",
    },
    fourthSection: {
      headerAr: "تألق دكتور دينا خيري  في الإعلام وشاشات التلفزيون والقنوات الفضائية كما تتميز باحترافيتها في التعامل مع الفنانات والمشاهير",
      headerEn: "Doctor Dina khairy shines in the media, television, and satellite channels, and is distinguished by her professionalism in dealing with artists and influencers",
      bodyAr: "تتألق دكتور دينا خيري  بحضورها اللافت في وسائل الإعلام وشاشات التلفزيون والقنوات الفضائية، حيث تشارك بخبرتها الكبيرة في مجال الجلدية والتجميل، مقدمة نصائح وحلول مبتكرة لمتابعيها. كما تتميز باحترافيتها العالية في التعامل مع الفنانات والشخصيات العامة، حيث تقدم لهن خدمات متخصصة ترتقي بمظهرهن وتعزز من ثقتهن بأنفسهن، مما يجعلها الخيار الأول للكثير من النجمات",
      bodyEn: "Doctor Dina khairy shines with her remarkable presence in the media, on television, and satellite channels, where she shares her vast expertise in dermatology and aesthetics, offering innovative tips and solutions to her audience. She is also known for her high level of professionalism in working with celebrities and public figures, providing them with specialized services that enhance their appearance and boost their confidence, making her the top choice for many stars.",
      imageUrls: [
        "https://www.imghippo.com/files/LuacN1725823578.jpg",
        "https://www.imghippo.com/files/qBjd21725822858.png",
        "https://www.imghippo.com/files/rEbsC1725823608.jpg",
      ],
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, show: false }));
      }, 3000); // Hide alert after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [alert.show]);


  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, value) => {
    setFormData((prevData) => {
      const updatedUrls = [...prevData[section].imageUrls];
      updatedUrls[index] = value;
      return {
        ...prevData,
        [section]: {
          ...prevData[section],
          imageUrls: updatedUrls,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    baseUrl.put('/about', formData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        setAlert({
          show: true,
          message: 'Data updated successfully!',
          variant: 'success'
        });
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Error updating data:', error);
        setAlert({
          show: true,
          message: 'Error updating data. Please try again.',
          variant: 'danger'
        });
        setIsSubmitting(false);
      });
  };

  return (
    <Container className='d111'>
      {/* Alert placed above the form */}
      {/* Centered Alert Overlay */}
      <div className={`alert-overlay ${alert.show ? 'show' : ''}`}>
        {alert.show && (
          <Alert variant={alert.variant} className='show' onClose={() => setAlert({ ...alert, show: false })} dismissible>
            {alert.message}
          </Alert>
        )}
      </div>
      <Form className="landing-section-form" onSubmit={handleSubmit}>
        {/* First Section */}
        <div className="form-section p-4 mb-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="mb-4" style={{ color: '#de647a' }}>First Section</h3>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name in Arabic</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstSection.nameAr}
                  onChange={(e) => handleInputChange('firstSection', 'nameAr', e.target.value)}
                  placeholder="Enter name in Arabic"
                  style={{ borderColor: '#de647a' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Name in English</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstSection.nameEn}
                  onChange={(e) => handleInputChange('firstSection', 'nameEn', e.target.value)}
                  placeholder="Enter name in English"
                  style={{ borderColor: '#de647a' }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title in Arabic</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstSection.titleAr}
                  onChange={(e) => handleInputChange('firstSection', 'titleAr', e.target.value)}
                  placeholder="Enter title in Arabic"
                  style={{ borderColor: '#de647a' }}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Title in English</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.firstSection.titleEn}
                  onChange={(e) => handleInputChange('firstSection', 'titleEn', e.target.value)}
                  placeholder="Enter title in English"
                  style={{ borderColor: '#de647a' }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Quote in Arabic</Form.Label>
            <Form.Control
              type="text"
              value={formData.firstSection.quoteAr}
              onChange={(e) => handleInputChange('firstSection', 'quoteAr', e.target.value)}
              placeholder="Enter quote in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quote in English</Form.Label>
            <Form.Control
              type="text"
              value={formData.firstSection.quoteEn}
              onChange={(e) => handleInputChange('firstSection', 'quoteEn', e.target.value)}
              placeholder="Enter quote in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bio in Arabic</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.firstSection.bioAr}
              onChange={(e) => handleInputChange('firstSection', 'bioAr', e.target.value)}
              placeholder="Enter bio in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bio in English</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.firstSection.bioEn}
              onChange={(e) => handleInputChange('firstSection', 'bioEn', e.target.value)}
              placeholder="Enter bio in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
        </div>

        {/* Second Section */}
        <div className="form-section p-4 mb-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="mb-4" style={{ color: '#de647a' }}>Second Section</h3>
          <Form.Group className="mb-3">
            <Form.Label>Header in Arabic</Form.Label>
            <Form.Control
              type="text"
              value={formData.secondSection.headerAr}
              onChange={(e) => handleInputChange('secondSection', 'headerAr', e.target.value)}
              placeholder="Enter header in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Header in English</Form.Label>
            <Form.Control
              type="text"
              value={formData.secondSection.headerEn}
              onChange={(e) => handleInputChange('secondSection', 'headerEn', e.target.value)}
              placeholder="Enter header in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body in Arabic</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.secondSection.bodyAr}
              onChange={(e) => handleInputChange('secondSection', 'bodyAr', e.target.value)}
              placeholder="Enter body in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body in English</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.secondSection.bodyEn}
              onChange={(e) => handleInputChange('secondSection', 'bodyEn', e.target.value)}
              placeholder="Enter body in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={formData.secondSection.imageUrl}
              onChange={(e) => handleInputChange('secondSection', 'imageUrl', e.target.value)}
              placeholder="Enter image URL"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
        </div>

        {/* Third Section */}
        <div className="form-section p-4 mb-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="mb-4" style={{ color: '#de647a' }}>Third Section</h3>
          <Form.Group className="mb-3">
            <Form.Label>Header in Arabic</Form.Label>
            <Form.Control
              type="text"
              value={formData.thirdSection.headerAr}
              onChange={(e) => handleInputChange('thirdSection', 'headerAr', e.target.value)}
              placeholder="Enter header in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Header in English</Form.Label>
            <Form.Control
              type="text"
              value={formData.thirdSection.headerEn}
              onChange={(e) => handleInputChange('thirdSection', 'headerEn', e.target.value)}
              placeholder="Enter header in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body in Arabic</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.thirdSection.bodyAr}
              onChange={(e) => handleInputChange('thirdSection', 'bodyAr', e.target.value)}
              placeholder="Enter body in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body in English</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.thirdSection.bodyEn}
              onChange={(e) => handleInputChange('thirdSection', 'bodyEn', e.target.value)}
              placeholder="Enter body in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={formData.thirdSection.imageUrl}
              onChange={(e) => handleInputChange('thirdSection', 'imageUrl', e.target.value)}
              placeholder="Enter image URL"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
        </div>

        {/* Fourth Section */}
        <div className="form-section p-4 mb-4 border rounded" style={{ backgroundColor: '#ffffff' }}>
          <h3 className="mb-4" style={{ color: '#de647a' }}>Fourth Section</h3>
          <Form.Group className="mb-3">
            <Form.Label>Header in Arabic</Form.Label>
            <Form.Control
              type="text"
              value={formData.fourthSection.headerAr}
              onChange={(e) => handleInputChange('fourthSection', 'headerAr', e.target.value)}
              placeholder="Enter header in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Header in English</Form.Label>
            <Form.Control
              type="text"
              value={formData.fourthSection.headerEn}
              onChange={(e) => handleInputChange('fourthSection', 'headerEn', e.target.value)}
              placeholder="Enter header in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body in Arabic</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.fourthSection.bodyAr}
              onChange={(e) => handleInputChange('fourthSection', 'bodyAr', e.target.value)}
              placeholder="Enter body in Arabic"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Body in English</Form.Label>
            <Form.Control
              as="textarea"
              value={formData.fourthSection.bodyEn}
              onChange={(e) => handleInputChange('fourthSection', 'bodyEn', e.target.value)}
              placeholder="Enter body in English"
              style={{ borderColor: '#de647a' }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image URLs</Form.Label>
            {formData.fourthSection.imageUrls.map((url, index) => (
              <Form.Control
                key={index}
                type="text"
                value={url}
                onChange={(e) => handleArrayChange('fourthSection', index, e.target.value)}
                placeholder={`Enter image URL ${index + 1}`}
                style={{ borderColor: '#de647a' }}
                className="mb-2"
              />
            ))}
            <Button
              variant="outline-primary"
              onClick={() => handleArrayChange('fourthSection', formData.fourthSection.imageUrls.length, '')}
            >
              Add Image URL
            </Button>
          </Form.Group>
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </Form>
    </Container>
  );
};

export default LandingSectionForm;
