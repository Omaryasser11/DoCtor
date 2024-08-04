import React, { useState } from 'react';

const testimonials = [
  {
    image: 'https://www.drwilliammiami.com/wp-content/uploads/2020/08/testimonial-15997.jpg',
    text: 'The best doctor. I had breast augmentation and they look so real and natural. Would recommend him to everyone who\'s looking for an amazing service. He’s very passionate about what he does and I loved it.',
    name: 'Maria, Miami',
    title: 'Patient',
    opacity: 0.9,
  },
  {
    image: 'https://www.drwilliammiami.com/wp-content/uploads/2020/08/testimonial-16031.jpg',
    text: 'The first time I met him, he made me feel comfortable. Greatest Dr., very professional. I’m a different person because of him. He is the best! Thank you and your team. Everyone was very nice to me. Again thank you!!!',
    name: 'Heidy, Miami',
    title: 'Patient',
    opacity: 0.8,
  },
  {
    image: 'https://www.drwilliammiami.com/wp-content/uploads/2020/08/testimonial-16137.jpg',
    text: 'The best he is amazing!!! He did such a great job I love the way I see myself in the mirror!!! He tells you exactly what you need in order to look your best, he is really honest I like that ... He is an artist !!!!',
    name: 'Leidy, Houston',
    title: 'Patient',
    opacity: 0.7,
  },
  {
    image: 'https://www.drwilliammiami.com/wp-content/uploads/2020/08/testimonial-16222.jpg',
    text: 'My experience was amazing with Dr. William. He explained me a lot of things about my procedure on my evaluation day. He did a really good job. My procedure was a liposuction 12 areas and breast augmentation. I recommend him 100%',
    name: 'Sarah, Nebraska',
    title: 'Patient',
    opacity: 0.6,
  },
];

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: '0px 4%',
  },
  column: {
    flex: '1 1 calc(25% - 16px)',
    margin: '8px',
    backgroundColor: '#0a2240',
    color: '#fff',
    position: 'relative',
    padding: '4%',
    textAlign: 'center',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    overflow: 'hidden',
    borderRadius: '8px',
    cursor: 'pointer',
    filter: 'grayscale(0%)',
  },
  columnHover: {
    transform: 'scale(1.05)',
    filter: 'grayscale(20%)',
  },
  columnOverlay: (opacity) => ({
    backgroundColor: '#0a2240',
    opacity,
  }),
  columnImageBg: (image) => ({
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '200px',
  }),
  testimonial: {
    fontSize: '16px',
    fontStyle: 'italic',
    color: '#fff',
  },
  quote: {
    fontSize: '30px',
  },
  wrap: {
    display: 'block',
  },
  title: {
    fontWeight: 'bold',
    marginTop: '10px',
  },
  divider: {
    height: '75px',
  },
};

const Testimonials = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div id="fws_66aaf48d6affe" style={{ paddingTop: '0px', paddingBottom: '0px' }} className='col-12'>
      <div className="wpb_row" style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        <div className="row-bg-wrap">
          <div className="inner-wrap" style={{ backgroundColor: 'rgb(10, 34, 64)', height: '850.875px', transform: 'translate3d(0px, 61.175px, 0px) scale(1.005)' }}></div>
        </div>
        <div className="container" style={styles.container}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="column"
              style={{
                ...styles.column,
                backgroundColor: `rgba(10, 34, 64, ${testimonial.opacity})`,
                ...(hoveredIndex === index ? styles.columnHover : {}),
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="column-image-bg-wrap">
                <div
                  className="column-image-bg"
                  style={styles.columnImageBg(testimonial.image)}
                ></div>
              </div>
              <div className="column-bg-overlay" style={styles.columnOverlay(testimonial.opacity)}></div>
              <div className="wpb_wrapper">
                <div className="divider" style={styles.divider}></div>
                <blockquote className="nectar_single_testimonial" style={styles.testimonial}>
                  <div className="inner">
                    <p>
                      <span className="open-quote" style={styles.quote}>”</span>
                      {testimonial.text}
                    </p>
                    <span className="wrap" style={styles.wrap}>
                      <span>{testimonial.name}</span>
                      <span className="title" style={styles.title}>{testimonial.title}</span>
                    </span>
                  </div>
                </blockquote>
                <div className="divider" style={styles.divider}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
