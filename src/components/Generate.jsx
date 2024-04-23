import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Generate = ({ file }) => {
  const navigate = useNavigate();

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
    "It's my right to contribute. Cast your vote!"
  ];

  // State to store the current prompt and loading status
  const [currentPrompt, setCurrentPrompt] = useState(prompts[0]);
  const [loading, setLoading] = useState(false);

  // Function to handle changing the prompt
  const handleChangePrompt = () => {
    setLoading(true); // Set loading to true before changing the prompt
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * prompts.length);
      setCurrentPrompt(prompts[randomIndex]);
      setLoading(false); // Set loading to false after changing the prompt
    }, 2000); // Simulate 2 seconds delay
  };

  // Function to handle navigation
  const handleClick = () => {
    navigate('/result');
  };

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
      {file ? ( // Display the uploaded image if file is present
        <div style={{ marginBottom: '20px' }}>
          <img src={URL.createObjectURL(file)} alt="Uploaded" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
        </div>
      ) : ( // Display the default gray background if no file is present
        <div style={{ width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'gray', marginBottom: '20px' }}></div>
      )}
      {loading ? ( // Show loading indicator if loading is true
        <p>Generating Prompt...</p>
      ) : (
        <p style={{ marginBottom: '30px' }}>{currentPrompt}</p>
      )}
      <button onClick={handleChangePrompt} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '30px' }}>Change Prompt</button>
      <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '30px' }}>Generate Picture and Share!</button>
      <p style={{ fontSize: '14px' }}>By Student of NIT Warangal</p>
    </div>
  );
};

export default Generate;
