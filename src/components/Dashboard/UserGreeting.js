// UserGreeting.js
import React from 'react';
import { Box, Typography, Paper, Avatar, Chip } from '@mui/material';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import WavingHandIcon from '@mui/icons-material/WavingHand';

const UserGreeting = ({ user }) => {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  
  let greeting = 'Selamat datang';
  if (currentHour < 12) {
    greeting = 'Selamat pagi';
  } else if (currentHour < 17) {
    greeting = 'Selamat siang';
  } else if (currentHour < 20) {
    greeting = 'Selamat sore';
  } else {
    greeting = 'Selamat malam';
  }
  
  const formattedDate = format(currentTime, "EEEE, dd MMMM yyyy", { locale: id });
  
  return (
    <Paper sx={{ 
      backgroundColor: 'white',
      borderRadius: 2,
      p: 3,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar 
          alt={user?.name || "John Dev"}
          sx={{ 
            width: 46, 
            height: 46, 
            bgcolor: '#5e72e4',
            mr: 2
          }}
        />
        
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              color: '#2c3e50',
              mr: 1
            }}>
              {greeting}, {user?.name || 'John Dev'}
            </Typography>
            <WavingHandIcon sx={{ color: '#FFD700', animation: 'wave 1.5s infinite', ml: 1 }} />
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Chip 
          label={user?.membership || "Premium"} 
          size="small"
          sx={{ 
            bgcolor: '#5e72e4', 
            color: 'white',
            fontWeight: 'bold',
            '& .MuiChip-label': { px: 1 }
          }}
        />
        
        {user?.isActive && (
          <Chip 
            label="Aktif" 
            size="small"
            sx={{ 
              bgcolor: '#2dce89', 
              color: 'white',
              fontWeight: 'medium',
              '& .MuiChip-label': { px: 1 }
            }}
          />
        )}
      </Box>
      
      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </Paper>
  );
};

export default UserGreeting;