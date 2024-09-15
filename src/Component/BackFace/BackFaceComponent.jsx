import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BackFaceComponent.scss';

function BackFaceComponent() {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      // Fetch data from your API
      axios.get(`http://dina-khairy.com/procedures`)
         .then(response => {
            // Ensure you access the 'data' array correctly
            setData(response.data.data);
            setLoading(false);
         })
         .catch(error => {
            setError(error);
            setLoading(false);
         });
   }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error fetching data: {error.message}</p>;

   // Limit the number of items to 6
   const limitedData = data.slice(0, 6);

   return (
      <div className="backFace">
         {limitedData.map((item) => (
            <div className='imageText' key={item.id}>
               <img className='image' src={item.iconUrl} alt={item.name} />
               <p className='imageDescribtion'>{item.name}</p>
            </div>
         ))}
      </div>
   );
}

export default BackFaceComponent;
