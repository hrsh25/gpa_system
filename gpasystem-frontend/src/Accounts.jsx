import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useAuth } from './AuthContext';
import AccountList from './AccountsList';

const AccountComponent = () => {
    const [accounts, setAccounts] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/accounts/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
        };

        if (token) {
            fetchAccounts();
        }
    }, [token]);

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <AccountList accounts={ accounts }/>
        </Box>
    );  
}

export default AccountComponent;
