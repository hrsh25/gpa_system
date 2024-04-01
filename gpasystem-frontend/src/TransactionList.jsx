import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TransactionList = ({transactions}) => {
    const getTransactionTypeName = (transactionType) => {
        const transactionTypeMap = {
          CR: 'Credit',
          DR: 'Debit',
        };
    
        return transactionTypeMap[transactionType] || transactionType;
    };
    
    const formatAmount = (transaction) => {
    const amount = parseFloat(transaction.amount);
    return transaction.transaction_type === 'CR'
        ? `+${amount}`
        : `-${amount}`;
    };
    
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom>
            Transactions
        </Typography>
        <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
            <Typography>ID</Typography>
            <Typography>Date</Typography>
            <Typography>Transaction Type</Typography>
            <Typography>Account Number</Typography>
            <Typography>Note</Typography>
            <Typography sx={{ textAlign: 'right' }}>Amount</Typography>
            </Box>
            {transactions.map((transaction) => (
            <Box key={transaction.id} sx={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 1, alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>{transaction.id}</Typography>
                <Typography>{new Date(transaction.date).toLocaleDateString()}</Typography>
                <Typography>{getTransactionTypeName(transaction.transaction_type)}</Typography>
                <Typography>{`****${transaction.account_number.slice(-4)}`}</Typography>
                <Typography>{transaction.note}</Typography>
                <Typography sx={{ textAlign: 'right' }}>{formatAmount(transaction)}</Typography>
            </Box>
            ))}
        </Paper>
        </Box>
    );    
}

export default TransactionList;
