//QuotaInfo.js
import React from 'react';
import { Box, Typography, LinearProgress, Paper, Tooltip, Button, Chip, Divider } from '@mui/material';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import TimerIcon from '@mui/icons-material/Timer';
import SpeedIcon from '@mui/icons-material/Speed';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';

const QuotaInfo = ({ user, activePackages = [], packages = [] }) => {
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
    if (percentage > 80) return '#f5365c'; // Red
    if (percentage > 60) return '#fb6340'; // Orange
    return '#2dce89'; // Green
  };
  
  const progressColor = getProgressColor(usedPercentage);

  // Mendapatkan informasi paket aktif terakhir
  const getLatestActivePackage = () => {
    if (!activePackages || activePackages.length === 0) return null;
    
    // Urutkan berdasarkan tanggal pembelian terbaru
    const sortedPackages = [...activePackages].sort((a, b) => {
      return new Date(b.purchaseDate) - new Date(a.purchaseDate);
    });
    
    const latestPackage = sortedPackages[0];
    const packageDetails = packages.find(p => p.id === latestPackage.packageId);
    
    return {
      ...latestPackage,
      details: packageDetails
    };
  };
  
  const latestPackage = getLatestActivePackage();
  
  return (
    <Paper sx={{ 
      backgroundColor: 'white',
      borderRadius: 2,
      p: 3,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          Info Kuota
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
                height: 8, 
                borderRadius: 4, 
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
        <TimerIcon sx={{ fontSize: 18, color: '#8898aa', mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Berlaku hingga: <span style={{ fontWeight: 'bold' }}>{formatDate(expiryDate)}</span>
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SpeedIcon sx={{ fontSize: 18, color: '#8898aa', mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Sisa <span style={{ fontWeight: 'bold', color: daysRemaining <= 5 ? '#f5365c' : 'inherit' }}>{daysRemaining} hari</span>
        </Typography>
      </Box>
      
      {/* Tampilkan paket aktif terakhir jika ada */}
      {latestPackage && (
        <Box sx={{ mb: 3 }}>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <VerifiedIcon sx={{ fontSize: 18, color: '#2dce89', mr: 1 }} />
            <Typography variant="body2" fontWeight="medium">
              Paket Aktif Terbaru
            </Typography>
          </Box>
          
          <Box sx={{ 
            p: 1.5, 
            bgcolor: 'rgba(94, 114, 228, 0.05)', 
            borderRadius: 1,
            border: '1px solid rgba(94, 114, 228, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5
          }}>
            <Typography variant="subtitle2" fontWeight="bold" color="primary">
              {latestPackage.details?.name || 'Paket Internet'}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                Masa berlaku: {formatDate(latestPackage.expiryDate)}
              </Typography>
              <Chip 
                label="Aktif" 
                size="small"
                sx={{ 
                  bgcolor: '#2dce89', 
                  color: 'white',
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default QuotaInfo;