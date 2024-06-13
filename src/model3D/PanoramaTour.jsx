import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PanoramaTour from './render';
import styles from './PanoramaTour.module.css'; // Import the CSS file
import { Button, Card, CardContent, Typography } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

const ModelPage = () => {
  const [searchParams] = useSearchParams();
  const queryParamValue = searchParams.get('hotel');
  const firstWord = queryParamValue.split(' ')[0];
  const [url, setUrl] = useState(`/panoramaTours/?hotel=${firstWord}&appType=Apartments&appId=Apartment1`);
  console.log(firstWord);

  const navigate = useNavigate();
  const goBack = () => { navigate(-1); };

  return (
    <div className={styles.content}>

      <div className={styles.leftArrow}>
        <WestIcon onClick = {() => goBack()}/>
      </div>

      <div className={styles.panoramaContent}>

        <div className={styles.panoramaTour}>
          <div className={styles.panoHeader}>
          <h1 className={styles.heading}>Virtual Hotel Tour</h1>
          <h2 className={styles.heading}>Explore the hotel and its amenities</h2>
          </div>
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
                  setUrl(`/panoramaTours/?hotel=${firstWord}&appType=Apartments&appId=Apartment1`)
                }
                endIcon={<BedOutlinedIcon />}
              >
                Hotel Room

              </Button>
              <Button
                sx={{ mb: 2, backgroundColor: '#18181A', color: '#fff', border: '1px solid #fff', borderRadius: '0.5rem', padding: '10px', fontSize: '1rem', textTransform: 'none' }}
                onClick={() =>
                  setUrl(`/panoramaTours/?hotel=${firstWord}&appType=Pool&appId=Apartment1`)
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
                  setUrl(`/panoramaTours/?hotel=${firstWord}&appType=ConferenceRoom&appId=Apartment1`)
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
