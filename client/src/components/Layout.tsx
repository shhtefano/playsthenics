// src/components/Layout.tsx
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';

interface isLoggedInProps {
  loggedIn: boolean;
}

const Layout: React.FC<isLoggedInProps> = ({ loggedIn }) => {
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la navigazione
  const handleNavigation = (path: string) => {
    navigate(path); // Naviga alla rotta specificata
  };

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
            component="div" // Cambiato a "div" per evitare il comportamento di bottone
            onClick={() => handleNavigation('/')} // Naviga alla home
            sx={{ 
              color: 'white', 
              textDecoration: 'none', 
              flexGrow: 1, 
              textAlign: { xs: 'center', sm: 'left' }, // Center on mobile, left on desktop
              mb: { xs: 1, sm: 0 }, // Margin bottom for mobile
              cursor: 'pointer' // Mostra il cursore come puntatore
            }}
          >
            Playsthenics
          </Typography>

          {/* Navigation Links */}
          <Grid container spacing={2} justifyContent={{ xs: 'center', sm: 'flex-end' }} sx={{ mt: { xs: 1, sm: 0 } }}>
            <Grid item>
              <Button color="inherit" onClick={() => handleNavigation('/profile')} sx={{ color: 'white' }}>
                Profile
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={() => handleNavigation('/workouts')} sx={{ color: 'white' }}>
                Workouts
              </Button>
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={() => handleNavigation('/friends')} sx={{ color: 'white' }}>
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
