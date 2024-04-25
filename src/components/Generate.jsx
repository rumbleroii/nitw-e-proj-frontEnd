import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Generate = ({ file, uuid }) => {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  // List of prompts
  const prompts = [
    "I wield the power. Cast your vote!",
    "It's my right. Cast your vote!",
    "It's my duty. Cast your vote!",
    "With my vote, I empower. Cast your vote!",
    "It's my right to change. Cast your vote!",
    "It's my duty to decide. Cast your vote!",
    "My vote, my power. Cast your vote!",
    "It's my right to speak. Cast your vote!",
    "It's my duty to engage. Cast your vote!",
    "I empower change. Cast your vote!",
    "It's my right to shape. Cast your vote!",
    "It's my duty to act. Cast your vote!",
    "With my vote, I lead. Cast your vote!",
    "It's my right to influence. Cast your vote!",
    "It's my duty to participate. Cast your vote!",
    "My vote, my impact. Cast your vote!",
    "It's my right to determine. Cast your vote!",
    "It's my duty to ensure. Cast your vote!",
    "With my vote, I inspire. Cast your vote!",
    "It's my right to contribute. Cast your vote!"
  ]

  // State variables
  const [currentPrompt, setCurrentPrompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);
  const [loading, setLoading] = useState(false);

  // Function to handle changing the prompt
  const handleChangePrompt = () => {
    setLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentPrompt(prompts[randomIndex]);
      setLoading(false);
    }, 2000);
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
        response = await axios.post('https://us-central1-votinggovt.cloudfunctions.net/mask', {baseImage: dataUrl, maskImage: dataUrl});

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

    //Clipping Mask
    canvas.width = 500;
    canvas.height = 500;
    
    img.onload = () => {
      // Mask
      // Set circle properties
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 2;
      const color = 'blue';

      // Draw circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.closePath();

      ctx.globalCompositeOperation = 'source-in';

      const startX = (canvas.width - img.width) / 2;
      const startY = (canvas.height - img.height) / 2;
  
      ctx.drawImage(img, startX, startY, img.width, img.height);

    };
    
    img.src = URL.createObjectURL(file);
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
      {file ? (
        <div style={{ marginBottom: '20px', width: '350px', height: '350px', overflow: 'hidden', borderRadius: "50%"}}>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onLoad={handleFileChange}
          />
        </div>
      ) : (
        <div
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            backgroundColor: 'gray',
            marginBottom: '20px'
          }}
        ></div>
      )}
      {loading ? (
        <p>Generating Prompt...</p>
      ) : (
        <p style={{ marginBottom: '30px' }}>{currentPrompt}</p>
      )}
      <button
        onClick={handleChangePrompt}
        style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}
      >
        Change Prompt
      </button>
      <button
        onClick={handleClick}
        style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '10px' }}
      >
        Generate Picture and Share!
      </button>
      <p style={{ fontSize: '14px' }}>By Student of NIT Warangal</p>
    </div>
  );
};

export default Generate;
