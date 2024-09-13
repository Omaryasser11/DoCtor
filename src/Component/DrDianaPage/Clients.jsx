import React from 'react';
import './Clients.scss';

const Clients = () => {



  return (
    <div className="clients-wrapper">
      <div className="clients">
        <div className="client-logo no-link">
          <a href="https://escad.org/">
            <img
              decoding="async"
              src="https://www.imghippo.com/files/yJ8271726113581.png"
              alt="client"
              width="178"
              height="100"
            />
          </a>
        </div>
        <div className="client-logo no-link">


          <a href="https://www.cbamedicine.com/">
            <img
              decoding="async"
              src="https://www.cbamedicine.com/wp-content/uploads/2024/01/New-Logo-CBAM-full.png"
              alt="client"
              width="225"
              height="175"
            />

          </a>

        </div>
        <div className="client-logo no-link">
          <img
            decoding="async"
            src="https://www.drwilliammiami.com/wp-content/uploads/2020/01/fma.png"
            alt="client"
            width="229"
            height="100"
          />
        </div>
      </div>
    </div>
  );
};

export default Clients;
