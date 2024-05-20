// ModelPage.js

import React from 'react';
import PanoramaTour from './render';
import styles from './PanoramaTour.module.css'; // Import the CSS file
import { Button } from '@mui/material';


const ModelPage = () => {
  return (
    <div className={styles.whole_page}>
      <h1>Virtual Hotel Tour</h1>
      <div className={styles.content}>
        <div className={styles.panoramaTour}>
          <PanoramaTour />
        </div>
        <div className={styles.panoramaButtons}>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            View 3D Room
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            View 3D Spa Facilities
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            View 3D Conference Rooms
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
