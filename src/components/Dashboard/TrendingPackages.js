// TrendingPackages.js 
import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Paper, 
  Divider, 
  Chip,
  useTheme,
  Avatar,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const TrendingPackages = ({ packages = [], onPurchase }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Filter trending packages from the packages array passed from Dashboard
  // First try to filter packages with trending: true
  let trendingPackages = packages?.filter(pkg => pkg.trending === true);
  
  // If no trending packages found, try to filter by category === 'trending'
  if (!trendingPackages || trendingPackages.length === 0) {
    trendingPackages = packages?.filter(pkg => pkg.category === 'trending');
  }
  
  // If still no trending packages found, show an empty message instead of creating new data
  const hasTrendingPackages = trendingPackages && trendingPackages.length > 0;

  const handleViewPackage = (pkg) => {
    onPurchase(pkg);
  };

  return (
    <Paper sx={{ 
      backgroundColor: 'white',
      borderRadius: 2,
      p: 3,
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
      height: '100%',
      overflow: 'hidden'
    }}>
      {hasTrendingPackages ? (
        <Grid container spacing={2}>
          {trendingPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pkg.id}>
              <Card sx={{ 
                boxShadow: 'none', 
                bgcolor: 'white',
                borderRadius: 2,
                border: `1px solid ${theme.palette.grey[100]}`,
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08)',
                  transform: 'translateY(-4px)'
                }
              }}>
                {/* Hot label */}
                {index === 0 && (
                  <Chip 
                    label="HOT" 
                    size="small" 
                    sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10, 
                      bgcolor: '#f5365c', 
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.7rem'
                    }} 
                  />
                )}
                
                <CardContent sx={{ 
                  p: 2.5, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%', 
                  justifyContent: 'space-between' 
                }}>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: pkg.name.includes('Gaming') ? '#7C4DFF' : '#5e72e4', 
                          width: 40, 
                          height: 40 
                        }}
                      >
                        {pkg.name.includes('Gaming') ? <VideogameAssetIcon /> : <WifiIcon />}
                      </Avatar>
                      <Box sx={{ ml: 1.5 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                          {pkg.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Masa berlaku {pkg.validity || '30 hari'}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden' }}>
                      {pkg.description}
                    </Typography>
                    
                    {/* Top Feature */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {pkg.name.includes('Gaming') ? (
                        <SignalCellularAltIcon sx={{ color: '#2dce89', fontSize: '1rem', mr: 1 }} />
                      ) : (
                        <SpeedIcon sx={{ color: '#5e72e4', fontSize: '1rem', mr: 1 }} />
                      )}
                      <Typography variant="caption" fontWeight="medium">
                        {pkg.features?.[0] || 'Akses internet cepat'}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <Typography variant="body1" color="text.secondary">
            Tidak ada paket trending saat ini
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default TrendingPackages;