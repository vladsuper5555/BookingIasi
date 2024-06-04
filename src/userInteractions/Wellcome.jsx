import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import background from './download.jpg';
function Welcome() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        overflow: 'hidden',
        padding: '20px', 
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          padding: '5%',
          borderRadius: '8px',
          textAlign: 'left',
          color: '#F5F5F5',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        <div style={{ textAlign: 'start' }}>
          <h1 style={{
            fontSize: '5.5vw', 
            fontWeight: 'bold',
            fontFamily: 'Montserrat',
            color:'#FFF'
          }}>
            Discover Iași
          </h1>
        </div>
        <div style={{ textAlign: 'start' }}>
          <h1 style={{
            fontSize: '2.5vw', 
            fontFamily: 'Montserrat',
            color:'#FFF',
          }}>
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
