import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { useParams } from 'react-router-dom';

import ballot from '../assets/ballot.png';
import sveepLogo from '../assets/sveep_logo.png';
import Generate from './Generate';
import styles from './Home.module.css';

const App = ({ onFileUpload }) => {
  const { param } = useParams();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState('1');

  useEffect(() => {
    const fetchData = async () => {
      if (!param) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `https://us-central1-votinggovt.cloudfunctions.net/generate?uuid=${param}`
        );
        console.log('Fetched data:', response.data);
        setCount(response.data.count);
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
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div class={styles.container}>
            <div class={styles.nav}>
                <img class={styles.navLogo} src={sveepLogo}></img>
                <div class={styles.navTitle}>
                  <p>Initiative by Collectorate Office, Hanumakonda</p>
                </div>
            </div>
            <div class={styles.containerMain}>
              <div class={styles.ballotJumbo}>
                <img src={ballot}/>
              </div>
              <div class={styles.headerNameDisplay}>
                  <span class={styles.headerNameDisplayName}>Person who sent you this</span>
                  <div class={styles.headerNameDisplayRow}>
                  <span>has </span>
                  <span class={styles.headerNameDisplayCount}>
                    <CountUp start={0} end={count} delay={0} duration={2.75}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </span>
                  <span>Shares!</span>
                  </div>
              </div>

              <div class={styles.headerMainButton}>
                Start the change, make a differnce!. Start By
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button className={styles.MainButton} onClick={handleClick}>
                  <p>Click a Picture</p>
                </button>
                </div>
              </div>
            <div class={styles.infoContainer}>
              <h3>Important Links</h3>
              <hr></hr>
                <div class={styles.infoContainerLinks}>
                  <span>SVEEP Website: <a href='https://ecisveep.nic.in'>https://ecisveep.nic.in</a></span>
                  <span>Voters Helpline: <a href='tel: 1800-425-1816'>1800-425-1816</a></span>
                </div>
            </div>
            <div className={styles.footer}>
              <p>Developed By Students of NIT Warangal</p>
            </div>
          </div>
          
        </>
      )}    
    </>
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