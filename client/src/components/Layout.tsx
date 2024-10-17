// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';

const Layout: React.FC = () => {
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#1e1e1e' }}>
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between', // Space between title and links
            flexDirection: { xs: 'column', sm: 'row' } // Column for mobile, row for desktop
          }}
        >
          {/* Title (clickable and redirects to home) */}
          <Typography 
            variant="h4" 
            component={Button} 
            href="/" 
            sx={{ 
              color: 'white', 
              textDecoration: 'none', 
              flexGrow: 1, 
              textAlign: { xs: 'center', sm: 'left' }, // Center on mobile, left on desktop
              mb: { xs: 1, sm: 0 } // Margin bottom for mobile
            }}
          >
            Playsthenics
          </Typography>

          {/* Navigation Links */}
          <Grid container spacing={2} justifyContent={{ xs: 'center', sm: 'flex-end' }} sx={{ mt: { xs: 1, sm: 0 } }}>
            <Grid item>
              <Button color="inherit" href="/profile" sx={{ color: 'white' }}>
                Profile
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" href="/workouts" sx={{ color: 'white' }}>
                Workouts
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" href="/friends" sx={{ color: 'white' }}>
                Friends
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <main>
        {/* This is where the child components will be rendered */}
        <Outlet />
      </main>
    </>
  );
};

export { Layout };
