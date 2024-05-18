import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
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
    const username = formData.get('username');
    const password = formData.get('password');
    
    try {
      const response = await fetch('http://localhost:5173/api/login', {
                method: "POST",
                body: JSON.stringify({username, password}), 
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            if (response.ok) {
              console.log("Login successful and cookie set");
              navigate('/userProf')
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
          <Button type="submit" id='submit' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Login
          </Button>
        </form>
        {message && <div id = 'responseMessage'>{message}</div>}
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
