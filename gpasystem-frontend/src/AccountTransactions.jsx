import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { useContext } from 'react';
import Sidebar from './Sidebar';
import TransactionList from './TransactionList';

const AccountTransactionsComponent = ({username}) => {
  const [transactions, setTransactions] = useState([]);
  const { accountId } = useParams();
  const { authToken } = useContext(AuthContext);
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/transactions/${accountId}/`, {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions for account:', error);
      }
    };

    if (authToken) {
      fetchTransactions();
    }
  }, [authToken, accountId]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar username={username}/>
      <TransactionList transactions={transactions}/>
    </Box>
  );
};

export default AccountTransactionsComponent;
