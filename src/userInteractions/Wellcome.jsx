import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import background from './images/landing-page-image.svg';
import styleLanding from './styles/landing-page-style.module.css';
function Welcome() {
  return (
    <div
    className={styleLanding["main-container"]}
    >
      <div
      className={styleLanding["info-container"]}
      >
        <div
        className={styleLanding["title-container"]}>
          <h1 
          className={styleLanding["main-title"]}
          >
            Discover Iași
          </h1>
        </div>
        <div>
          <h1 
          className={styleLanding["main-description"]}>
            Experience the rich history, vibrant culture, and charming beauty of Iasi on your next getaway.
          </h1>
        </div>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          sx={{background: '#FFF'}} style={{color: '#000', fontFamily: 'Montserrat'}}
          className="welcome-button"
          id="connect"
        >
          Click to continue
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
