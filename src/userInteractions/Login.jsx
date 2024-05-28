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
              src="https://s3-alpha-sig.figma.com/img/eefa/c6d8/9662c3dd404d083e2346c12bedc1dd0a?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nX039MenPo6Js4uZddoHNB6Ua9I0Tcpuc3S9lywAodak9-Pw7LQXmFSt8rTa6OJPguZ~kVQCLj5mSrVy5TZ-6UADhe7ofzT~NivTYXDTsizHz5NqwcoS3-rXIXu-G9Yg0Uc7eaPGQapzQLOPoND2sgsglH8o7LbjVYJcd6hqCCIiwdRFp-6fumkuCXQIyDzPrW-AkkC8gezdXN6CIkGxrixXGb77Q1vj-T1tMU5A5RAtxds5tKQlcNZzlMNJwKyQBDndFIdzWhjsBArYwrytdnNQ1FfZwambChCCVpW7FTeiObJ~3u7yeF6eWylR0SXu90rvif1oIjOq9P2UXQFRgg__" // Replace with your image URL
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
