import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TransactionList from './TransactionList';

const TransactionsComponent = ({ authToken, username }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/all-transactions/', {
            headers: {
                Authorization: `Bearer ${authToken.access}`,
              },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (authToken) {
      fetchTransactions();
    }
  }, [authToken]);

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar username={username} onNavigate={(view) => console.log(`Navigate to: ${view}`)} />
        <TransactionList transactions={transactions}></TransactionList>
    </Box>
  );

};

export default TransactionsComponent;
