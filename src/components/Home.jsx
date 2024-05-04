import axios from 'axios';
import imageCompression from 'browser-image-compression';
import React, { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import { useParams } from 'react-router-dom';

import ballot from '../assets/ballot.png';
import sveepLogo from '../assets/sveep_logo.png';

import Generate from './Generate';
import styles from './Home.module.css';

const options = {
  maxSizeMB: 0.5,
  useWebWorker: true,
  maxIteration: 30,         
  alwaysKeepResolution: true 
}

const App = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState('1');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://asia-south1-votinggovt.cloudfunctions.net/generate-1?uuid=105583`
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

  const handleFileChange = async (event) => {
    const imageFile = event.target.files[0];
    const compressedFile = await imageCompression(imageFile, options);
    onFileUpload(compressedFile); // Pass the uploaded file to the parent component
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
                  <p>Initiative by Distrct Collectors Office, Hanumakonda</p>
                </div>
            </div>
            <div class={styles.containerMain}>
              <div class={styles.ballotJumbo}>
                <img src={ballot}/>
              </div>
              <div class={styles.headerNameDisplay}>
                  <span class={styles.headerNameDisplayName}>You are the</span>
                  <div class={styles.headerNameDisplayRow}>
                  {/* <span>has </span> */}
                  <span class={styles.headerNameDisplayCount}>
                    <CountUp start={0} end={count} delay={0} duration={2.75}>
                      {({ countUpRef }) => (
                        <div>
                          <span ref={countUpRef} />
                        </div>
                      )}
                    </CountUp>
                  </span>
                  <span class={styles.headerNameDisplayName}>Visitor!</span>
                  </div>
              </div>

              <div class={styles.headerMainButton}>
                Contribute to the change, Make a difference on <br></br>13th May 2024!
                <input
                  type="file"
                  accept="capture=camera,image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <button className={styles.MainButton} onClick={handleClick}>
                  <p>Click a Picture</p>
                </button>
                </div>
              </div>
            {/* <div class={styles.infoContainer}>
              <h3>Important Links</h3>
              <hr></hr>
                <div class={styles.infoContainerLinks}>
                  <span>SVEEP Website: <a href='https://ecisveep.nic.in'>https://ecisveep.nic.in</a></span>
                  <span>Voters Helpline: <a href='tel: 1800-425-1816'>1800-425-1816</a></span>
                </div>
            </div> */}
            
          </div>
          <div className={styles.footer}>
                <p><span style={{ color: "#FFD68E" }}>ECI Website:</span><a href='https://eci.gov.in'>eci.gov.in</a></p>
                <p><span style={{ color: "#FFD68E" }}>Voters Helpline:</span><a href='tel: 1800-425-1816'>1800-425-1816</a></p>
                <br></br>
                <p>Developed By Students of NIT Warangal</p>
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
    setFile(uploadedFile);
  };

  return (
    <>
      {file ? <Generate file={file} uuid={param} /> : <App onFileUpload={handleFileUpload} />}
    </>
  );
};

export default Home;