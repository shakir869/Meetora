import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField, Box, Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");

    const { addToUserHistory } = useContext(AuthContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            {/* Nav bar */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: { xs: 2, sm: 4 },
                    py: 1.5,
                    bgcolor: '#ffffff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(90deg, #6c5ce7, #00cec9)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Apna Video Call
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <IconButton
                        onClick={() => { navigate("/history") }}
                        sx={{
                            color: '#6c5ce7',
                            '&:hover': { bgcolor: 'rgba(108,92,231,0.08)' },
                        }}
                    >
                        <RestoreIcon />
                    </IconButton>
                    <Typography sx={{ color: 'text.secondary', mr: 1, fontSize: 14 }}>
                        History
                    </Typography>

                    <Button
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        startIcon={<LogoutIcon />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 2,
                            color: '#d63031',
                            '&:hover': { bgcolor: 'rgba(214,48,49,0.08)' },
                        }}
                    >
                        Logout
                    </Button>
                </Box>
            </Box>

            {/* Main content */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap-reverse',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    minHeight: 'calc(100vh - 72px)',
                    px: { xs: 3, md: 8 },
                    py: 4,
                    background: 'linear-gradient(180deg, #f7f7fb 0%, #eef0fc 100%)',
                }}
            >
                {/* Left panel */}
                <Box sx={{ maxWidth: 480, flex: 1, minWidth: 300 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a2e',
                            mb: 3,
                            lineHeight: 1.3,
                        }}
                    >
                        Providing Quality Video Call Just Like Quality Education
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1.5,
                            bgcolor: '#fff',
                            p: 1.5,
                            borderRadius: 3,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            flexWrap: 'wrap',
                        }}
                    >
                        <TextField
                            onChange={e => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                            size="small"
                            sx={{
                                flex: 1,
                                minWidth: 180,
                                '& .MuiOutlinedInput-root': { borderRadius: 2 },
                            }}
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant='contained'
                            sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                                bgcolor: '#6c5ce7',
                                boxShadow: '0 6px 16px rgba(108,92,231,0.35)',
                                '&:hover': {
                                    bgcolor: '#5a4bd6',
                                    boxShadow: '0 8px 20px rgba(108,92,231,0.45)',
                                },
                            }}
                        >
                            Join
                        </Button>
                    </Box>
                </Box>

                {/* Right panel */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 280,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        component="img"
                        srcSet='/logo3.png'
                        alt=""
                        sx={{
                            maxWidth: '100%',
                            width: 420,
                            filter: 'drop-shadow(0 20px 40px rgba(108,92,231,0.25))',
                        }}
                    />
                </Box>
            </Box>
        </>
    )
}

export default withAuth(HomeComponent)