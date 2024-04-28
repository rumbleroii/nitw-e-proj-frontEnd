import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import sveepLogo from '../assets/sveep_logo.png';
import styles from "./Generate.module.css";

const Generate = ({ file, uuid }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null); // Create a ref for file input
  const [maskFile, setMaskFile] = useState(null); // Add state for mask file

  // List of prompts
  const prompts = [
    "I wield the power. Cast your vote!",
    "It's my right. Cast your vote!",
    "It's my duty. Cast your vote!",
  ]

  // State variables
  const [currentPrompt, setCurrentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);
  const [loading, setLoading] = useState(false);
  const [promptLoading, setPromptLoading] = useState(false);

  // Function to handle changing the prompt
  const handleChangePrompt = () => {
    setPromptLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentPrompt(prompts[randomIndex]);
      setPromptLoading(false);
    }, 2000);
  };

  const handleMaskFileChange = (event) => {
    setMaskFile(event.target.files[0]);
  };

  // Function to handle navigation
  const handleClick = async () => {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL(); 
      setLoading(true);
     
      try {
        // Update the counter
        let response = await axios.patch(`https://us-central1-votinggovt.cloudfunctions.net/update?uuid=${uuid}`, { uuid: uuid });
        console.log('Counter Updated');
  
        // Process the mask
        response = await axios.post('https://us-central1-votinggovt.cloudfunctions.net/mask', { baseImage: dataUrl });
  
        // Get the result data from the response
        const resultData = response.data;
  
        // Pass the result data to the 'navigate' function
        navigate('/result', { state: { resultData } }); // This passes 'resultData' as state
  
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    };

  // Function to handle file change
  const handleFileChange = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      const cropWidth = 1000;
      const cropHeight = 1000;

                // Calculate the starting coordinates of the crop box
      const cropX = (img.width - cropWidth) / 2;
      const cropY = (img.height - cropHeight) / 2;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // Draw the image with the calculated starting point
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
    );
    };

    img.src = URL.createObjectURL(file);
  };

  return (
    // <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    //   <h2 style={{ marginBottom: '20px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
    //   {file ? (
    //     <div style={{ marginBottom: '20px', width: '350px', height: '350px', overflow: 'hidden', borderRadius: "50%" }}>
    //       <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    //       <img
    //         src={URL.createObjectURL(file)}
    //         alt="Uploaded"
    //         style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    //         onLoad={handleFileChange}
    //       />
    //     </div>
    //   ) : (
    //     <div
    //       style={{
    //         width: '200px',
    //         height: '200px',
    //         borderRadius: '50%',
    //         backgroundColor: 'gray',
    //         marginBottom: '20px'
    //       }}
    //     ></div>
    //   )}
    //   {loading ? (
    //     <p>Generating Prompt...</p>
    //   ) : (
    //     <p style={{ marginBottom: '30px' }}>{currentPrompt}</p>
    //   )}
    //   <input type="file" ref={fileInputRef} onChange={handleMaskFileChange} style={{ marginBottom: '10px' }} /> {/* Add this line */}
    //   <button
    //     onClick={handleChangePrompt}
    //     style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}
    //   >
    //     Change Prompt
    //   </button>
    //   <button
    //     onClick={handleClick}
    //     style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}
    //   >
    //     Generate Picture and Share!
    //   </button>
    //   <p style={{ fontSize: '14px' }}>By Student of NIT Warangal</p>
    // </div>
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
          <div class={styles.headerTitle}>
            <p>Choose a Prompt</p>
          </div>
          <div class={styles.profilePicture}>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              onLoad={handleFileChange}
            />
          </div>
          <div class={styles.prompt}>
            <h3>Tap to change prompt</h3>
            {!promptLoading ? <p onClick={handleChangePrompt}>{currentPrompt}</p> : <p>Generating Prompt...</p> }
          </div>
          <div class={styles.headerButtons}>
            {!loading ? (
              <>
              <button class={styles.generate} onClick={handleClick}>Generate Picture and Share!</button>
              </>  
            ) : (
              <>
              <button class={styles.generate} onClick={handleClick} disabled>Generate Picture and Share! <FontAwesomeIcon icon={faSpinner} transform="grow-14" spin></FontAwesomeIcon></button>
              </>  
            )}
          </div>
          <div class={styles.footer}>
            <p>Developed By Students of NIT Warangal</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate;


