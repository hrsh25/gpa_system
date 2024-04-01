import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TransactionList from './TransactionList';
import { useAuth } from './AuthContext';

const TransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/all-transactions/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token]);

  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <TransactionList transactions={transactions}></TransactionList>
    </Box>
  );
};

export default TransactionsComponent;
