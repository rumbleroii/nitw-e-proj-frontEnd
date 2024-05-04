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

  // List of prompts
  const prompts = [
    "My Vote, My Power, Cast your vote!",
    "It's my duty. Cast your vote!",
    "#Cast your vote!",
  ]

  const promptsMap = {
    "My Vote, My Power, Cast your vote!" : '0',
    "It's my duty. Cast your vote!" : '1',
    "#Cast your vote!" : '2'
  }

  // State variables
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(false);
  const [promptLoading, setPromptLoading] = useState(false);

  // Function to handle changing the prompt
  const handleChangePrompt = () => {
    setPromptLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentPrompt(prompts[randomIndex]);
      setIndex(randomIndex)
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

      console.log(promptsMap[currentPrompt])
     
      try {  
        // Process the mask
        let response = await axios.patch(`https://asia-south1-votinggovt.cloudfunctions.net/update-1?uuid=105583`, { uuid: uuid });
        console.log("Count Updated")

        response = await axios.post('https://asia-south1-votinggovt.cloudfunctions.net/mask-1', { baseImage: dataUrl, promptId: promptsMap[currentPrompt] });
  
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
      let value;
      if(img.width >= img.height) {
          value = img.height
      } else {
          value = img.width
      }

      const canvasWidth = value
      const canvasHeight = value
  
      // Set the canvas dimensions to the desired size
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
  
      // Calculate the starting coordinates to center the canvas on the image
      const startX = (img.width - canvasWidth) / 2;
      const startY = (img.height - canvasHeight) / 2;
  
      // Clear the canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
      // Draw the image centered on the canvas
      ctx.drawImage(img, -startX, -startY);
    };
    img.src = URL.createObjectURL(file);
  };

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


