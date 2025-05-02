// QuotaInfo.js
import React from 'react';
import { Box, Typography, LinearProgress, Paper, Tooltip, Button } from '@mui/material';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TimerIcon from '@mui/icons-material/Timer';
import SpeedIcon from '@mui/icons-material/Speed';
import { useNavigate } from 'react-router-dom';

const QuotaInfo = ({ user }) => {
  const navigate = useNavigate();
  
  // Default values in case user data isn't available
  const remainingQuota = user?.remainingQuota || 2.1;
  const totalQuota = user?.totalQuota || 3;
  const usedPercentage = ((totalQuota - remainingQuota) / totalQuota) * 100;
  const quotaUnit = user?.quotaUnit || 'GB';
  const expiryDate = user?.expiryDate || '2026-05-02';
  
  // Format the expiry date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  // Calculate days remaining
  const calculateDaysRemaining = (dateString) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  // Helper function to determine progress color
  const getProgressColor = (percentage) => {
    if (percentage > 80) return '#f44336'; // Red
    if (percentage > 60) return '#ff9800'; // Orange
    return '#00c853'; // Green
  };
  
  const progressColor = getProgressColor(usedPercentage);
  
  return (
    <Paper sx={{ 
      backgroundColor: 'white',
      borderRadius: 2,
      p: 3,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0.1) 100%)'
    }}>
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <DataUsageIcon sx={{ fontSize: 28, color: '#1976d2', mr: 1.5 }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Info Quota
        </Typography>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 0.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
            Sisa Kuota
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: progressColor }}>
            {remainingQuota} {quotaUnit}
          </Typography>
        </Box>
        
        <Tooltip 
          title={`${Math.round(usedPercentage)}% terpakai dari ${totalQuota} ${quotaUnit}`} 
          arrow
          placement="top"
        >
          <Box sx={{ position: 'relative', pt: 0.5, pb: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={usedPercentage}
              sx={{ 
                height: 10, 
                borderRadius: 5, 
                bgcolor: 'rgba(0, 0, 0, 0.08)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: progressColor,
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }
              }}
            />
            <Typography 
              variant="caption" 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: 'text.secondary',
                fontWeight: 'bold',
                mt: 0.5,
                textShadow: '0 0 4px rgba(255, 255, 255, 0.7)'
              }}
            >
              {Math.round(usedPercentage)}%
            </Typography>
          </Box>
        </Tooltip>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            0 {quotaUnit}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {totalQuota} {quotaUnit}
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <TimerIcon sx={{ fontSize: 18, color: '#546e7a', mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Berlaku hingga: <span style={{ fontWeight: 'bold' }}>{formatDate(expiryDate)}</span>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SpeedIcon sx={{ fontSize: 18, color: '#546e7a', mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Sisa <span style={{ fontWeight: 'bold', color: daysRemaining <= 5 ? '#f44336' : 'inherit' }}>{daysRemaining} hari</span>
        </Typography>
      </Box>
      
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Button 
          variant="outlined" 
          size="small"
          onClick={() => navigate('/customer/packages')}
          sx={{ 
            borderRadius: '20px', 
            fontSize: '0.8rem',
            px: 2,
            textTransform: 'none',
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
            borderColor: '#1976d2',
            '&:hover': {
              borderColor: '#1565c0',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.25)',
            }
          }}
        >
          Tambah Kuota
        </Button>
      </Box>
    </Paper>
  );
};

export default QuotaInfo;