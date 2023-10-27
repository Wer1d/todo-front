
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const theme = createTheme();

export default function ResetPassword() {
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        password: data.get('password'),
        });
    };

    let [username, setUsername] = useState('');

    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');  
    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Reset Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              value = {username}
              onChange = {(e) => {
                setUsername(e.target.value);
              }}
            />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value = {password}
                    onChange = {(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="confirmpassword"
                id="confirmpassword"
                autoComplete="comfirm-password"
                value = {confirmPassword}
                    onChange = {(e) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
                
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick = {() => {
                    if (password !== confirmPassword) {
                        alert("Passwords don't match");
                        setPassword('');
                        setConfirmPassword('');
                        return;
                    }
                    axios.get('http://localhost:5180/Users')
                    .then((response) => {
                        const data = response.data;
                        const resultUser = data.filter(user => user.username === username);
                        console.log(resultUser  )
                        if (resultUser.length === 0) {
                            alert("User doesn't exist");
                        }
                        const userId = resultUser.map(user => user.id);
                        axios.put('http://localhost:5180/Users/'+userId,
                        {username: username, password: password},
                        ).then((response) => {
                            
                            navigate('/SignIn');
                        }).catch((error) => {
                            if (error.code == 'ECONNABORTED') {
                                console.log('timeout');
                            }  else{
                                console.log(error.response.status);
                            }
                        })
                        
                      })
                      .catch((error) => {
                        console.error("Error fetching data:", error);
                      });
                    
                }}
                
                >
                Reset Password
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="/SignIn" variant="body2">
                    Back</Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
    }
