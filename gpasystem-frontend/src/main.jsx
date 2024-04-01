import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // A blue shade
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#d32f2f', // A red shade
      light: '#ef5350',
      dark: '#c62828',
      contrastText: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded corners for buttons
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
)
