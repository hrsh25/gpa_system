import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  paper: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = ({ onLoginSuccess }) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await axios.post('http://localhost:8000/api/token/', credentials);
      onLoginSuccess(response.data, credentials.username);
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography component="h1" variant="h5">
          GPA
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address / Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChange}
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
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
