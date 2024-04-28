import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useLocation } from 'react-router-dom';

import { faShare } from '@fortawesome/free-solid-svg-icons';
import sveepLogo from '../assets/sveep_logo.png';
import styles from './Result.module.css';

const Result = () => {
  const location = useLocation();
  const [uuid, setUuid] = useState();
  const [shareUrl, setShareUrl] = useState('');
  const [imageData, setImageData] = useState(null); // State to store image data
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
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

    setLoading(false);
  };

  // Extract image data from location state when component mounts
  React.useEffect(() => {
    if (location.state && location.state.resultData) {
      setImageData(location.state.resultData.maskedImage);
    }
  }, [location.state]);

  return (
    <>
    <div class={styles.container}>
        <div class={styles.nav}>
          <img class={styles.navLogo} src={sveepLogo}></img>
          <div class={styles.navTitle}>
            <p>Initiative by Collectorate Office, Hanumakonda</p>
          </div>
          <hr></hr>
        </div>
        
        <div class={styles.header}>
          <div class={styles.headerTitle}>You've ignited the spark to vote </div>
          <div class={styles.profilePicture}>
            {imageData && <img src={imageData} alt="Uploaded"/>}
          </div>
        </div>
        <div class={styles.headerButtons}>
          {!loading ? <button class={styles.generate} onClick={handleShare}>Share <FontAwesomeIcon icon={faShare} transform="grow-5"  /> </button> : <button class={styles.generate} onClick={handleShare} disabled>Share it, Make a Change  <FontAwesomeIcon icon={faSpinner} transform="grow-14" spin></FontAwesomeIcon></button>}
        </div>
        <div class={styles.infoContainer}>
          <h3 class={styles.swing}>Say 'Hi' to our Chatbot!</h3>
          <a href='https://wa.me/message/7A5PVG72ITTWL1'>Click Here</a>
        </div>
        <div class={styles.footer}>
            <p>Developed By Students of NIT Warangal</p>
          </div>
    </div>
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      tweenDuration={10000}
      recycle={false}
      numberOfPieces={200}
    />
    </>
  );
};

export default Result;
