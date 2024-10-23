// src/components/Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Link } from '@mui/material';

interface LoginProps {
    handleLogin: (credentials: { username: string; password: string }) => void;
}

const Login: React.FC<LoginProps> = ({ handleLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // This function is triggered when the user clicks on the Login button
    const onLoginClick = () => {
        handleLogin({ username, password });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                mt: 8,
                width: '100%',
                maxWidth: 360, // Optional: Limit width for better alignment on large screens
                mx: 'auto', // Centers the form horizontally
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom color="white">
                Sign In!
            </Typography>

            <TextField
                label="Username"
                variant="outlined"
                fullWidth
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update username state
                InputProps={{
                    style: { borderColor: 'white' }, // Set border color to white
                }}
                InputLabelProps={{
                    style: { color: 'white' }, // Set label color to white
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // White border
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // White border on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // White border when focused
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'white', // Set text color to white
                    },
                }}
            />

            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                InputProps={{
                    style: { borderColor: 'white' }, // Set border color to white
                }}
                InputLabelProps={{
                    style: { color: 'white' }, // Set label color to white
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // White border
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // White border on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // White border when focused
                        },
                    },
                    '& .MuiInputBase-input': {
                        color: 'white', // Set text color to white
                    },
                }}
            />

            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, backgroundColor: 'black', color: 'white', borderRadius: 20 }}
                onClick={onLoginClick} // Handle login on button click
            >
                Login
            </Button>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    mt: 5,
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant="body2"
                    sx={{ color: '#fff', fontSize: '1.1rem' }} // White text and increased size
                >
                    Don't have an account?
                </Typography>

                <Link
                    href="/register"
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#fff', // White color for the link
                        textDecoration: 'none', // Remove underline
                        fontSize: '1.2rem', // Bigger text size
                        mt: 3,
                    }}
                >
                    Register
                </Link>

                <Typography
                    variant="body2"
                    sx={{ color: '#fff', fontSize: '1.1rem', mt: 3 }} // White text and increased size
                >
                    or
                </Typography>

                <Link
                    href="/demo"
                    variant="body2"
                    sx={{
                        fontWeight: 'bold',
                        color: '#fff', // White color for the link
                        textDecoration: 'none', // Remove underline
                        fontSize: '1.2rem', // Bigger text size
                        mt: 3,
                    }}
                >
                    TRY OUR DEMO
                </Link>
            </Box>
        </Box>
    );
};

export { Login };
