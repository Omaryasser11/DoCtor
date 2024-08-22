import React from 'react';
import './Clients.scss';

const Clients = () => {



  return (
    <div className="clients-wrapper">
      <div className="clients">
        <div className="client-logo no-link">
          <img
            decoding="async"
            src="https://www.drwilliammiami.com/wp-content/uploads/2020/01/AMA-logo.png"
            alt="client"
            width="178"
            height="100"
          />
        </div>
        <div className="client-logo no-link">
          <img
            decoding="async"
            src="https://www.drwilliammiami.com/wp-content/uploads/2020/01/asps-logo-e.png"
            alt="client"
            width="135"
            height="100"
          />
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
