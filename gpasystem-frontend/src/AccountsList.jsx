import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AccountList = ( {accounts} ) => {
    
    const formatAccountNumber = (accountNumber) => {
        return accountNumber.replace(/(.{4})/g, '$1 ');
    };
    return (
        <Box sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}>
            {accounts.map((account) => (
            <Card key={account.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%', mb: 2 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h6" component="div">
                    Account Number
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {formatAccountNumber(account.account_number)}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Typography variant="h6" component="div">
                    Current Balance
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ textAlign: 'right' }}>
                    ${account.current_balance}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
                    <Button
                    size="small"
                    variant="text"
                    component={Link}
                    to={`transactions/${account.id}`}
                    >
                    View Transactions
                    </Button>
                </Box>
                </CardContent>
            </Card>
            ))}
        </Box>
    )
}

export default AccountList;