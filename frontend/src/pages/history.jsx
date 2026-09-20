import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

import { IconButton } from '@mui/material';
export default function History() {

    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])

    const routeTo = useNavigate();

    useEffect(() => {
    const fetchHistory = async () => {
        try {
            const history = await getHistoryOfUser();
            setMeetings(history);
        } catch {
            // IMPLEMENT SNACKBAR
        }
    }

    fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [])
    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #f7f7fb 0%, #eef0fc 100%)',
                px: { xs: 2, sm: 4 },
                py: 3,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: 3,
                }}
            >
                <IconButton
                    onClick={() => { routeTo("/home") }}
                    sx={{
                        bgcolor: '#fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        '&:hover': { bgcolor: '#f0f0f5' },
                    }}
                >
                    <HomeIcon sx={{ color: '#6c5ce7' }} />
                </IconButton>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#1a1a2e' }}>
                    Meeting History
                </Typography>
            </Box>

            {meetings.length !== 0 ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: 2,
                    }}
                >
                    {meetings.map((e, i) => (
                        <Card
                            key={i}
                            variant="outlined"
                            sx={{
                                borderRadius: 3,
                                border: 'none',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    boxShadow: '0 10px 28px rgba(108,92,231,0.15)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                                    <VideocamOutlinedIcon sx={{ color: '#6c5ce7', fontSize: 20 }} />
                                    <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1a1a2e' }}>
                                        {e.meetingCode}
                                    </Typography>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <EventNoteIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                                    <Typography sx={{ fontSize: 13 }} color="text.secondary">
                                        {formatDate(e.date)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            ) : (
                <Box
                    sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        mt: 8,
                    }}
                >
                    <VideocamOutlinedIcon sx={{ fontSize: 48, color: '#c4c4d4', mb: 1 }} />
                    <Typography>No meeting history yet</Typography>
                </Box>
            )}
        </Box>
    )
}