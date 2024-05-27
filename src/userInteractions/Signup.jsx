import React, { useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, Grid, Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

  const validateEmail = (email) => {
    // verificare adresa de email valida
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = (formData) => {
    const errors = {};

    if (!formData.get('givenName')) {
      errors.givenName = 'First Name is required';
    }

    if (!formData.get('familyName')) {
      errors.familyName = 'Last Name is required';
    }

    if (!formData.get('username')) {
      errors.username = 'Username is required';
    }

    const email = formData.get('email');
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.get('password')) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

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
        navigate('/health-form');
      } else {
        const responseObject = await response.json();
        setMessage(responseObject.message || 'Signup failed');
        console.error("Signup failed");
      }
    } catch (error) {
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
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button type="submit" id="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign up
          </Button>
        </form>
        {message && <div id='responseMessage'>{message}</div>}
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
