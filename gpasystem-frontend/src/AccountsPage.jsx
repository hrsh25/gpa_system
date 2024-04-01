import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/accounts/')
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleViewTransactions = accountId => {
    // Implement routing to the TransactionsPage or open a modal with transaction details
  };

  return (
    <Grid container spacing={4}>
      {accounts.map(account => (
        <Grid item xs={12} sm={6} md={4} key={account.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Account Number
              </Typography>
              <Typography variant="body1">
                {account.account_number}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Current Balance
              </Typography>
              <Typography variant="body1">
                ${account.current_balance}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleViewTransactions(account.id)}>
                View Transactions
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AccountsPage;
