import React, { useState } from 'react';
import PanoramaTour from './render';
import styles from './PanoramaTour.module.css'; // Import the CSS file
import { Button, Card, CardContent, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

const ModelPage = () => {
  const [url, setUrl] = useState('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=Apartments&appId=Apartment1');
  return (
    <div className={styles.content}>

      <div className={styles.leftArrow}>
        <WestIcon />
      </div>

      <div className={styles.panoramaContent}>

        <div className={styles.panoramaTour}>
          <h1 className={styles.heading}>Virtual Hotel Tour</h1>
          <h2 className={styles.heading}>Explore the hotel and its amenities</h2>
          <PanoramaTour url={url} />
        </div>

        <div className={styles.panoramaButtonsContainer}>
          <Card className={styles.buttonsCard} sx={{ backgroundColor: '#2f2f30', borderRadius: '6%' }}>
            <CardContent className={styles.cardContent}>
              <Typography className={styles.buttonsHeader} variant="h6" >
                Click to see:
              </Typography>
              <Button
                sx={{
                  mb: 2, backgroundColor: '#fff', color: '#18181A',
                  border: '1px solid #fff', borderRadius: '0.5rem',
                  padding: '10px', fontSize: '1rem', textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  }
                }}
                onClick={() =>
                  setUrl('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=Apartments&appId=Apartment1')
                }
                endIcon={<BedOutlinedIcon />}
              >
                Hotel Room

              </Button>
              <Button
                sx={{ mb: 2, backgroundColor: '#18181A', color: '#fff', border: '1px solid #fff', borderRadius: '0.5rem', padding: '10px', fontSize: '1rem', textTransform: 'none' }}
                onClick={() =>
                  setUrl('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=Pool&appId=Apartment1')
                }
                endIcon={<SpaOutlinedIcon />}
              >
                Spa
              </Button>
              <Button
                sx={{
                  backgroundColor: '#fff', color: '#18181A', border: '1px solid #fff',
                  borderRadius: '0.5rem', padding: '10px', fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    color: '#fff',
                  }
                }}
                onClick={() =>
                  setUrl('http://localhost:5173/api/panoramas/?hotel=Unirea&appType=ConferenceRoom&appId=Apartment1')
                }
                endIcon={<MeetingRoomOutlinedIcon />}
              >
                Conference Room
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>



    </div>
  );
};

export default ModelPage;
