
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    try {
      const response = await fetch('http://localhost:5173/api/login', {
                method: "POST",
                body: JSON.stringify({username, password}), 
                headers: {
                    "Content-Type": "application/json",
                }
            });
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
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </form>
        {message && <div>{message}</div>}
        <Grid container justifyContent="flex">
        <Grid item>
          <Typography variant="body2" color="textSecondary" align="center" gutterBottom>
            You don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
          </Typography>
        </Grid>
      </Grid>

      </Box>
    </Container>
  );
}

export default Login;
