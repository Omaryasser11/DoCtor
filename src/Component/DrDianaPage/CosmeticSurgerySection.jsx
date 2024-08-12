import React from 'react';
import './CosmeticSurgerySection.scss';

const CosmeticSurgerySection = () => {
  return (
    <div className="cosmetic-surgery-section">
      <div className="row">
        <div className="column left-column">
          <h3>Cosmetic Surgery</h3>
          <p>
            As a board-certified plastic surgeon, Dr. William has chosen to narrow and focus his practice
            specifically on cosmetic surgery of the breast and body. This sub-specialization led him to perform
            fewer types of operations which has enabled him to master those procedures. “I would rather perform
            fewer types of operations, but focus my attention solely on those operations of the breast and body,
            and what I have found by specializing is that I can get the very best results possible for my patients.”
          </p>
        </div>
        <div className="column right-column">
          <div className="image-container">
            <img
              src="https://www.drwilliammiami.com/wp-content/uploads/2020/05/dr-william-mission-1-scaled.jpg"
              alt="Dr. William"
              className="responsive-image"
            />
            <div className="hover-overlay"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmeticSurgerySection;
