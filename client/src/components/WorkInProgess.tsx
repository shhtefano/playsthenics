import { Box, Typography } from '@mui/material';
import React from 'react';

const WorkInProgess: React.FC = () => {
  return (
    <>

        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mt: 8,
                width: '100%',
                maxWidth: 360, // Optional: Limit width for better alignment on large screens
                mx: 'auto' // Centers the form horizontally
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom color="white">
            Work in progress...
            </Typography>
        </Box>
    </>
  );
}

export { WorkInProgess };
