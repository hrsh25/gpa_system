import React from 'react';
import { Box, Button, Typography, Divider } from '@mui/material';
import { NavLink as RouterNavLink, useRouteMatch } from 'react-router-dom';
import { styled } from '@mui/system';

const NavLink = styled(RouterNavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }
}));

const Sidebar = ({ username }) => {
  // Using useRouteMatch to highlight the button based on the current path
  const isAccountsActive = !!useRouteMatch({ path: '/', exact: true });
  const isTransactionsActive = !!useRouteMatch('/all-transactions');
  return (
    <Box sx={{ width: 240, height: '100vh', borderRight: '1px solid #ddd', padding: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Hi, {username}!
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Button component={NavLink} to="/" exact fullWidth sx={{
          my: 1,
          bgcolor: isAccountsActive ? 'primary.main' : 'inherit',
          ':hover': {
            bgcolor: isAccountsActive ? 'primary.dark' : '',
          },
        }}>
        Accounts
      </Button>
      <Button component={NavLink} to="/all-transactions" fullWidth sx={{
          my: 1,
          bgcolor: isTransactionsActive ? 'primary.main' : 'inherit',
          ':hover': {
            bgcolor: isTransactionsActive ? 'primary.dark' : '',
          },
        }}>
        Transactions
      </Button>
    </Box>
  );
};

export default Sidebar;
