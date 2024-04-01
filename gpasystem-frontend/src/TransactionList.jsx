import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TransactionList = ({transactions}) => {
    const getTransactionTypeName = (transactionType) => {
        const transactionTypeMap = {
          CR: 'Credit',
          DR: 'Debit',
        };
    
        return transactionTypeMap[transactionType];
    };
    
    const getStatusName = (transactionStatus) => {
        const transactionStatusMap = {
            S: 'Success',
            F: 'Failed',
        };
        return transactionStatusMap[transactionStatus];
    }

    const formatAmount = (transaction) => {
        const amount = parseFloat(transaction.amount);
        return transaction.transaction_type === 'CR'
            ? `+${amount}`
            : `-${amount}`;
    };
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h6" gutterBottom>
            Transactions
        </Typography>
        <Paper elevation={2} sx={{ width: '100%'}}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, backgroundColor: 'primary.main', color: 'primary.contrastText', p: 2 }}>
            <Typography>ID</Typography>
            <Typography>Date</Typography>
            <Typography sx={{textAlign: 'right'}}>Transaction Type</Typography>
            <Typography sx={{textAlign: 'right'}}>Account Number</Typography>
            <Typography sx={{textAlign: 'right'}}>Note</Typography>
            <Typography sx={{textAlign: 'right'}}>Amount</Typography>
            <Typography sx={{textAlign: 'right'}}>Status</Typography>
            </Box>
            {transactions.length > 0 ? (transactions.map((transaction) => (
            <Box key={transaction.id} sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, alignItems: 'center', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography>{transaction.id}</Typography>
                <Typography>{formatDate(transaction.date)}</Typography>
                <Typography sx={{textAlign: 'right'}}>{getTransactionTypeName(transaction.transaction_type)}</Typography>
                <Typography sx={{textAlign: 'right'}}>{`****${transaction.account_number.slice(-4)}`}</Typography>
                <Typography sx={{textAlign: 'right'}}>{transaction.note}</Typography>
                <Typography sx={{textAlign: 'right'}}>{formatAmount(transaction)}</Typography>
                <Typography sx={{textAlign: 'right'}}>{getStatusName(transaction.status)}</Typography>
            </Box>
            ))):(<Typography sx={{ p: 2 }}>No transactions available.</Typography>)}
        </Paper>
        </Box>
    );    
}

export default TransactionList;
