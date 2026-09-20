import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

// Custom modern theme
const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#6c5ce7',
        },
        secondary: {
            main: '#00cec9',
        },
        background: {
            default: '#0a0e27',
        },
    },
    shape: {
        borderRadius: 16,
    },
    typography: {
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
        h4: {
            fontWeight: 700,
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default function Authentication() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState();
    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0);
                setPassword("")
            }
        } catch (err) {
            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* Left side: gradient hero panel instead of a random photo */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        background: 'linear-gradient(135deg, #6c5ce7 0%, #341f97 50%, #0a0e27 100%)',
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#fff',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* soft glow accents */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: 400,
                            height: 400,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.08)',
                            top: -100,
                            left: -100,
                            filter: 'blur(10px)',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            background: 'rgba(0,206,201,0.15)',
                            bottom: -80,
                            right: -80,
                            filter: 'blur(20px)',
                        }}
                    />

                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.15)', width: 72, height: 72, mb: 3 }}>
                        <LockOutlinedIcon sx={{ fontSize: 36 }} />
                    </Avatar>
                    <Typography variant="h4" sx={{ mb: 1, textAlign: 'center', px: 4 }}>
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8, textAlign: 'center', px: 6 }}>
                        Sign in to continue where you left off, or create an account to get started.
                    </Typography>
                </Grid>

                {/* Right side: auth card */}
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={0}
                    square
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f7f7fb',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 400,
                            mx: 4,
                            p: 4,
                            borderRadius: 4,
                            bgcolor: '#fff',
                            boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ fontWeight: 700, mt: 1 }}>
                            {formState === 0 ? 'Sign In' : 'Create Account'}
                        </Typography>

                        {/* Pill-style toggle instead of two separate buttons */}
                        <Box
                            sx={{
                                display: 'flex',
                                mt: 3,
                                mb: 1,
                                bgcolor: '#f0f0f5',
                                borderRadius: 3,
                                p: 0.5,
                                width: '100%',
                            }}
                        >
                            <Button
                                fullWidth
                                onClick={() => { setFormState(0) }}
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1,
                                    bgcolor: formState === 0 ? '#fff' : 'transparent',
                                    color: formState === 0 ? 'primary.main' : 'text.secondary',
                                    boxShadow: formState === 0 ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        bgcolor: formState === 0 ? '#fff' : 'rgba(0,0,0,0.03)',
                                    },
                                }}
                            >
                                Sign In
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => { setFormState(1) }}
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1,
                                    bgcolor: formState === 1 ? '#fff' : 'transparent',
                                    color: formState === 1 ? 'primary.main' : 'text.secondary',
                                    boxShadow: formState === 1 ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.25s ease',
                                    '&:hover': {
                                        bgcolor: formState === 1 ? '#fff' : 'rgba(0,0,0,0.03)',
                                    },
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 2, width: '100%' }}>
                            {formState === 1 ? (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="fullname"
                                    label="Full Name"
                                    name="fullname"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                />
                            ) : <></>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                            />

                            {error ? (
                                <Typography
                                    sx={{
                                        color: '#d63031',
                                        bgcolor: 'rgba(214,48,49,0.08)',
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1,
                                        mt: 1,
                                        fontSize: 14,
                                    }}
                                >
                                    {error}
                                </Typography>
                            ) : null}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 3,
                                    mb: 1,
                                    py: 1.3,
                                    boxShadow: '0 8px 20px rgba(108,92,231,0.35)',
                                    '&:hover': {
                                        boxShadow: '0 10px 24px rgba(108,92,231,0.45)',
                                    },
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? 'Login' : 'Register'}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
            />
        </ThemeProvider>
    );
}
