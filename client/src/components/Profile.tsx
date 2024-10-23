import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';

interface UserProps {
  username: string | undefined,
  role: string | undefined,
  handleLogout: () => void;
}

const imageUrl = 'http://localhost:3001/static/boy.png'

const Profile: React.FC<UserProps> = ({ username, role, handleLogout }) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2,
          mt: 8,
          width: '100%',
          maxWidth: 360,
          mx: 'auto',
        }}
      >
        <Typography variant="h6" component="h1" gutterBottom color="white">
          Welcome back, {username}!
        </Typography>

        <Box sx={{
          padding: 2,
          border: '1px solid #0c0c0c',
          borderRadius: 1,
          backgroundColor: '#0c0c0c',
          boxShadow: 2,
          width: '80%'
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <Avatar
              alt={username}
              src={imageUrl}
              sx={{ width: 56, height: 56, marginRight: 12, marginLeft: 4 }}
            />
            <Stack spacing={1}>
              <Typography variant="h6" color="white">{username}</Typography>
              <Typography variant="body2" color="white">{role}</Typography>
            </Stack>

          </Box>
          <Box
            sx={{
              alignItems: 'center',
              padding: 2,
            }}
          >

            <Stack spacing={1}>
              <Typography variant="h6" color="white">Total Exp: 543xp</Typography>
              <Typography variant="h6" color="white">Level: 6</Typography>
            </Stack>
          </Box>

        </Box>


        <Typography variant="h6" component="h1" gutterBottom color="white">
          Previous workouts
        </Typography>


        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between',
            padding: 2,
            border: '1px solid #0c0c0c',
            borderRadius: 1,
            backgroundColor: '#0c0c0c',
            boxShadow: 2,
            width: '80%'

          }}
        > 

          <Stack spacing={1}
          >

            <Typography variant="body1" color="white">Workout</Typography>

            <Typography variant="body2" color="white">Full Body Beginner</Typography>
          </Stack>
          <Stack spacing={1}
          >
            <Typography variant="body1" color="white">Category</Typography>
            <Typography variant="body2" color="white">Strength</Typography>
          </Stack>

          <Avatar
            alt={username}
            src={'http://localhost:3001/static/workout1.png'}
            // sx={{ width: 56, height: 56, marginLeft: 12, marginRight: 4 }}
          />
          </Box>


        

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, backgroundColor: 'black', color: 'white', borderRadius: 20, width: '50%' }}
          onClick={handleLogout} // Handle login on button click
        >
          Logout
        </Button>

      </Box>
    </>
  );
}

export { Profile };
