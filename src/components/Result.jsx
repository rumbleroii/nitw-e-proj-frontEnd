import { faDownload, faShare, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useLocation } from 'react-router-dom';
import sveepLogo from '../assets/sveep_logo.png';
import styles from './Result.module.css';

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

const Result = ({ resultData }) => {
  const location = useLocation();
  const [uuid, setUuid] = useState();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleDownload = async () => {
    var a = document.createElement("a"); //Create <a>
    a.href = imageData
    console.log(a.href)
    a.download = "profile_picture.png"; //File name Here
    a.click(); //Downloaded file
  };

  const handleBotClick = () => {
    window.open('https://wa.me/message/7A5PVG72ITTWL1','_blank', 'rel=noopener noreferrer')
  }

  const handleShare = async () => {
    setLoading(true);
  
    const shareText = 'Show your support for this 13th May Elections. Visit the link to create your own DP: https://voterspointhnk.in/';
    const shareTitle = 'Initiative By Collectorate Office, Hanumakonda';

    try {
      return navigator.share({
        title: shareTitle,
        text: shareText, // Append the URL to the text
      });
    } catch (error) {
      console.error('Error sharing content:', error);
    }
    
    setLoading(false);
  }

  // Generate a download link for the Base64 image data
  const generateDownloadLink = (base64Data) => {
    const linkSource = `data:image/png;base64,${base64Data}`;
    return linkSource;
  };

  // Extract image data from location state when component mounts
  React.useEffect(() => {
    if (location.state && location.state.resultData) {
      setImageData(location.state.resultData.maskedImage);
    }
  }, [location.state]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.nav}>
          <img className={styles.navLogo} src={sveepLogo}></img>
          <div className={styles.navTitle}>
            <p>Initiative by Collectorate Office, Hanumakonda</p>
          </div>
          <hr></hr>
        </div>
        <div className={styles.header}>
          <div className={styles.headerTitle}>You've ignited the spark to vote </div>
          <div className={styles.profilePicture}>
            {imageData && <img src={imageData} alt="Uploaded" />}
          </div>
        </div>
        <div className={styles.headerButtons}>
          {!loading ? (
            <button className={styles.generate} onClick={handleShare}>
              Share Link <FontAwesomeIcon icon={faShare} transform="grow-5" />
            </button>
          ) : (
            <button className={styles.generate} disabled>
              Share Link <FontAwesomeIcon icon={faSpinner} transform="grow-5" spin></FontAwesomeIcon>
            </button>
          )}

          {!loading ? (
            <button className={styles.generate} onClick={handleDownload}>
              Download Picture <FontAwesomeIcon icon={faDownload} transform="grow-5" />
            </button>
          ) : (
            <button className={styles.generate} disabled>
              Download Picture <FontAwesomeIcon icon={faDownload} transform="grow-5" />
            </button>
          )}
        </div>
        <div className={styles.infoContainer}>
          <h4>To know Your Voting Booth Location, <br></br>Say 'Hi' to our Chatbot!</h4>
          <p onClick={handleBotClick} className={styles.swing}  style={{ textAlign:'center', padding: "0.3rem", textDecoration: "underline", color:"blue"}}href='https://wa.me/+919704560805'>Click Here</p>
        </div>
        <div className={styles.footer}>
          <p>Developed By Students of NIT Warangal</p>
        </div>
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} tweenDuration={10000} recycle={false} numberOfPieces={200} />
    </>
  );
};

export default Result;