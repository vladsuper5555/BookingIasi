import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import background from './download.jpg';

function Login() {
  const [message, setMessage] = useState('');
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
    const username = formData.get('username');
    const password = formData.get('password');
    
    try {
      const response = await fetch('/api/login', {
                method: "POST",
                body: JSON.stringify({username, password}), 
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (response.ok) {
              console.log("Login successful and cookie set");
              navigate('/attractions')
          } else {
            navigate('/login')
            console.error("Login failed");
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
  //make a function that sends a get request to the backend to check if the user is already logged in, if he is then send him to userProf, otherwise randeaza pagina asta de login

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
              Login
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
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
              <Button type="submit" id='submit' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Login
              </Button>
            </form>
            {message && <div id='responseMessage'>{message}</div>}
            <Grid container justifyContent="center">
              <Grid item>
                <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
                  You don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
                </Typography>
              </Grid>
            </Grid>
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
              alt="Login illustration"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;
