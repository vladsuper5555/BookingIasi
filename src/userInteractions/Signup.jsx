import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import background from './download.jpg';
function Signup() {
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          navigate('/userProf');
        }
      } catch (error) {
        console.error("An error occurred while checking authentication:", error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const givenName = formData.get('givenName');
    const familyName = formData.get('familyName');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('/api/signup', {
        method: "POST",
        body: JSON.stringify({ givenName, familyName, username, email, password }),
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok) {
        console.log("Signup successful and cookie set");
        navigate('/health-form')
      } else {
        navigate('/signup')
        console.error("Signup failed");
      }

      const responseObject = await response.json();
      setMessage(() => responseObject.message);

    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }

  };

  return (
    <Container component="main" maxWidth="lg" sx={{ height: '100vh' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid 
          item 
          xs={12} 
          md={6} 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundColor: 'white' 
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: '400px',
              padding: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" component="h1" align="center" gutterBottom>
              Sign up
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="First_Name"
                label="First Name"
                name="givenName"
                className='TextField'
                error={!!errors.givenName}
                helperText={errors.givenName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Last_Name"
                label="Last Name"
                name="familyName"
                className='TextField'
                error={!!errors.familyName}
                helperText={errors.familyName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                className='TextField'
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                className='TextField'
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                className='TextField'
              />
              <Button type="submit" id='submit' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign up
              </Button>
            </form>
            {message && <div id='responseMessage'>{message}</div>}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              src={background}
              alt="Signup illustration"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
