import axios from 'axios';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const [uuid, setUuid] = useState();
  const [shareUrl, setShareUrl] = useState('');
  const [imageData, setImageData] = useState(null); // State to store image data

  const handleShare = async () => {
    try {
      const response = await axios.post('https://us-central1-votinggovt.cloudfunctions.net/generateNumber');
      console.log(response.data.number);
      setUuid(response.data.number);
    } catch (error) {
      console.error('Error fetching UUID:', error);
    }

    // Construct share text with UUID
    const shareText = `\n\nUUID: ${uuid}\n\nShare this image, UUID, and text on WhatsApp!`;

    // Share content if browser supports Web Share API, otherwise open WhatsApp directly
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

  // Extract image data from location state when component mounts
  React.useEffect(() => {
    if (location.state && location.state.resultData) {
      setImageData(location.state.resultData.maskedImage);
    }
  }, [location.state]);

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
      <div style={{ position: 'relative', marginBottom: '30px' }}>
        {/* Render image if imageData exists */}
        {imageData && <img src={imageData} alt="Uploaded" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />}
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
