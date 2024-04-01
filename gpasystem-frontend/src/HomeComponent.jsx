import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import AccountComponent from './Accounts';

const HomeComponent = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      <AccountComponent/>
    </Box>
  );
};

export default HomeComponent;
