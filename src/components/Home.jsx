import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Generate from './Generate';

import styles from './Home.module.css';


const App = ({ onFileUpload }) => {
    const { param } = useParams();
    
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        if (!param) return;

        try {
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
      <div className={styles.container}>
        <div className={styles.navHeader}>
          <p>Initiative By Collectorate Office, Hanmakonda</p>
        </div>
        <div className={styles.bodyContainer}>
          <div className={styles.bodyContainerBox}>
            <p className={styles.bodyP1}>Person who has sent you this</p>
            <p className={styles.bodyP2}>has made a change by sharing it with</p>
            <p className={styles.counterP}>{count} People</p>
            <p className={styles.bodyP3}>and they believe you can too, Join Them and make a difference!. Start By</p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button 
              className={styles.uploadButton} 
              onClick={handleClick}
            >
              <p style={{padding: '10% 20px'}}>Upload Your Picture</p>
            </button>
          </div>
        </div>
        <div className={styles.footer}>
          <p>By Student of NIT Warangal</p>
        </div>
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

/*
<div>
      <div className="header">
        <h1>Header</h1>
      </div>
      <div className="body">
        <p>This is the body section.</p>
        <p>You can add your content here.</p>
      </div>
      <div className="footer">
        <p>&copy; 2023 Your Website</p>
      </div>
    </div>

<div className={styles.container}>
        <div style={{ backgroundColor: 'gray', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '10px' }}>Initiative By Collectorate Office, Hanmakonda</h2>
        </div>
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

*/