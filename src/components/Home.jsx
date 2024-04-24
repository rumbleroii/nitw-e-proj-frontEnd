import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Generate from './Generate';

  const App = ({ onFileUpload }) => {
    const { param } = useParams();
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        if (!param) return;

        try {
          console.log(param)
          setLoading(true);
          const response = await axios.get(`https://us-central1-votinggovt.cloudfunctions.net/generate?uuid=${param}`);
          console.log('Fetched data:', response.data);
          setCount(response.data.count)
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    const handleClick = () => {
      // Trigger the file input click event
      fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      console.log('Uploaded file:', file);
      onFileUpload(file); // Pass the uploaded file to the parent component
    };

    return (
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
        <div style={{ backgroundColor: 'gray', padding: '40px', borderRadius: '8px' }}>
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Person who has sent you this</p>
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>has made a change by sharing it with</p>
          <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>{count} People</p>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>and they believe you can too, Create the change, Start by</p>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button 
            style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '15px' }}
            onClick={handleClick}
          >
            Upload Your Picture!
          </button>
          <p style={{ fontSize: '16px' }}>Or Connect With Facebook</p>
        </div>
        <p style={{ marginTop: '20px', fontSize: '14px' }}>By Student of NIT Warangal</p>
        {loading && <p>Loading...</p>}
      </div>
    );
  };

  const Home = () => {
    const { param } = useParams();
    const [file, setFile] = useState(null);
    const handleFileUpload = (uploadedFile) => {
      setFile(uploadedFile); // Set the uploaded file
    };

    return (
      <>
        {file ? <Generate file={file} uuid={param} /> : <App onFileUpload={handleFileUpload} />}
      </>
    );
  };

  export default Home;