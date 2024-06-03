import React from 'react';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Welcome() {
  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: 'url("https://s3-alpha-sig.figma.com/img/eefa/c6d8/9662c3dd404d083e2346c12bedc1dd0a?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nX039MenPo6Js4uZddoHNB6Ua9I0Tcpuc3S9lywAodak9-Pw7LQXmFSt8rTa6OJPguZ~kVQCLj5mSrVy5TZ-6UADhe7ofzT~NivTYXDTsizHz5NqwcoS3-rXIXu-G9Yg0Uc7eaPGQapzQLOPoND2sgsglH8o7LbjVYJcd6hqCCIiwdRFp-6fumkuCXQIyDzPrW-AkkC8gezdXN6CIkGxrixXGb77Q1vj-T1tMU5A5RAtxds5tKQlcNZzlMNJwKyQBDndFIdzWhjsBArYwrytdnNQ1FfZwambChCCVpW7FTeiObJ~3u7yeF6eWylR0SXu90rvif1oIjOq9P2UXQFRgg__")',
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
