import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import AccountComponent from './Accounts';

const HomeComponent = ({ authToken, username }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar username={username}/>
      <AccountComponent authToken={authToken}/>
    </Box>
  );
};

export default HomeComponent;
