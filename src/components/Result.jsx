import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Result = () => {
  const [uuid, setUuid] = useState();
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Fetch UUID using Axios
    const fetchUuid = async () => {
      try {
        const response = await axios.post('https://us-central1-votinggovt.cloudfunctions.net/generateNumber');
        console.log(response.data.number);
        setUuid(response.data.number);
      } catch (error) {
        console.error('Error fetching UUID:', error);
      }
    };
    fetchUuid();
  }, []);

  const handleShare = async () => {
    const shareText = `\n\nUUID: ${uuid}\n\nShare this image, UUID, and text on WhatsApp!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Initiative By Collectorate Office, Hanmakonda',
          text: shareText,
          url: uuid,
        });
        console.log('Shared successfully');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      const shareUrl = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
      setShareUrl(shareUrl);
      window.open(shareUrl);
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
        ></div>
      </div>
      <div style={{ marginBottom: '30px' }}>
        <button onClick={handleShare} style={{ padding: '10px 20px', fontSize: '16px' }}>
          Share it, Make a Change
        </button>
      </div>
      {shareUrl && (
        <p style={{ marginBottom: '30px' }}>
          If WhatsApp doesn't open, <a href={shareUrl} target="_blank" rel="noopener noreferrer">click here</a> to share.
        </p>
      )}
      <p style={{ marginBottom: '30px' }}>Click Here to know your Voting Booth Location</p>
      <p style={{ fontSize: '14px' }}>By Student of NIT Warangal</p>
    </div>
  );
};

export default Result;