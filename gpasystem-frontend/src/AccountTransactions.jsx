import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import TransactionList from './TransactionList';

const AccountTransactionsComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const { accountId } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/transactions/${accountId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions for account:', error);
      }
    };

    if (token) {
      fetchTransactions();
    }
  }, [token, accountId]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar/>
      <TransactionList transactions={transactions}/>
    </Box>
  );
};

export default AccountTransactionsComponent;
