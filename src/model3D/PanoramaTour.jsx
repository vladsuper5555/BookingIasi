// ModelPage.js

import React, { useState } from 'react';
import PanoramaTour from './render';
import styles from './PanoramaTour.module.css'; // Import the CSS file
import { Button } from '@mui/material';


const ModelPage = () => {
  const [url, setUrl] = useState('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=Apartments&appId=Apartment1');
  return (
    <div className={styles.whole_page}>
      <h1>Virtual Hotel Tour</h1>
      <div className={styles.content}>
        <div className={styles.panoramaTour}>
          <PanoramaTour url={url}/>
        </div>
        <div className={styles.panoramaButtons}>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => 
              setUrl('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=Apartments&appId=Apartment1')
            }
          >
            View 3D Room
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => 
              setUrl('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=Pool&appId=Apartment1')
            }
          >
            View 3D Spa Facilities
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => 
              setUrl('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=ConferenceRoom&appId=Apartment1')
            }
          >
            View 3D Conference Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
