
import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Signup() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5173/api/check-auth', {
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
    const givenName  =  formData.get('givenName');
    const familyName  =  formData.get('familyName');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      const response = await fetch('http://localhost:5173/api/signup', {
                method: "POST",
                body: JSON.stringify({givenName, familyName, username, email, password}), 
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

      console.log(response);
      
      const responseObject = await response.json();
      console.log(responseObject);
      setMessage(()=>responseObject.message);

    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
   
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Sign up 
        </Typography>
        <form onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="First_Name"
            label="First Name"
            name="givenName"
            className='TextField'
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
            autoFocus
            className='TextField'
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
          <Button type="submit" id = "submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
          </Button>
        </form>
        {message && <div id = 'responseMessage'>{message}</div>}
        <Grid container justifyContent="flex">
          <Grid item>
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                Happy to see you here! 😊
                </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Signup;
