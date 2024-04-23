import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Result = () => {
  const [uuid, setUuid] = useState('lols');

  useEffect(() => {
    // Fetch UUID using Axios
    const fetchUuid = async () => {
      try {
        const response = await axios.get('https://your-api-url.com/uuid');
        setUuid(response.data.uuid);
      } catch (error) {
        console.error('Error fetching UUID:', error);
      }
    };

    fetchUuid();
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Initiative By Collectorate Office, Hanmakonda',
        text: 'Check out this initiative!',
        url: uuid, // Share the fetched UUID
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported');
    }
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'gray',
            position: 'relative',
          }}
        >
        </div>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <button onClick={handleShare} style={{ padding: '10px 20px', fontSize: '16px' }}>Share it, Make a Change</button>
      </div>
      <p style={{ marginBottom: '30px' }}>Click Here to know your Voting Booth Location</p>
      <p style={{ fontSize: '14px' }}>By Student of NIT Warangal</p>
    </div>
  );
};

export default Result;
