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
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';

const TrendingPackages = ({ packages, onPurchase }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Default trending package if none is provided
  const trendingPackages = packages?.filter(pkg => pkg.trending) || [
    {
      id: 1,
      name: 'Paket Gaming 15GB',
      description: '15GB khusus gaming. Masa berlaku 30 hari',
      price: 50000,
      trending: true,
      features: ['Low latency', 'Prioritas jaringan', 'Akses VIP game online'],
      icon: <SportsEsportsIcon />,
      color: '#7C4DFF',
      validity: '30 hari'
    },
    {
      id: 2,
      name: 'Paket Bulanan 30GB',
      description: '30GB untuk semua kebutuhan. Masa berlaku 30 hari',
      price: 150000,
      trending: true,
      features: ['Unlimited Social Media', 'Bonus streaming 5GB', 'Rollover kuota'],
      icon: <WifiIcon />,
      color: '#00BFA5',
      validity: '30 hari'
    }
  ];

  const handleViewPackage = (pkg) => {
    // Option 1: Navigate to packages page
    // navigate('/customer/packages');
    
    // Option 2: Open purchase dialog directly
    onPurchase(pkg);
  };

  return (
    <Paper sx={{ 
      backgroundColor: 'white',
      borderRadius: 3,
      p: 0,
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <Box sx={{ 
        p: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.grey[100]}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TrendingUpIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
            Trending Paket
          </Typography>
        </Box>
        
        <Button 
          variant="outlined" 
          size="small"
          onClick={() => navigate('/customer/packages')}
          sx={{ 
            borderRadius: 5,
            textTransform: 'none',
            px: 2,
            borderColor: theme.palette.grey[300],
            color: theme.palette.text.primary,
            '&:hover': {
              borderColor: theme.palette.grey[400],
              bgcolor: theme.palette.grey[50]
            }
          }}
        >
          Lihat Semua
        </Button>
      </Box>
      
      {/* Trending Package Cards */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={2}>
          {trendingPackages.map((pkg, index) => (
            <Grid item xs={12} sm={6} key={pkg.id}>
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
                      bgcolor: '#FF5252', 
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
                          bgcolor: pkg.color || theme.palette.primary.main, 
                          width: 40, 
                          height: 40 
                        }}
                      >
                        {pkg.icon || (pkg.name.includes('Gaming') ? <VideogameAssetIcon /> : <WifiIcon />)}
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
                      {pkg.description || '15GB khusus gaming dengan ping stabil dan latency rendah'}
                    </Typography>
                    
                    {/* Top Feature */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {pkg.name.includes('Gaming') ? (
                        <SignalCellularAltIcon sx={{ color: theme.palette.success.main, fontSize: '1rem', mr: 1 }} />
                      ) : (
                        <SpeedIcon sx={{ color: theme.palette.primary.main, fontSize: '1rem', mr: 1 }} />
                      )}
                      <Typography variant="caption" fontWeight="medium">
                        {pkg.features?.[0] || (pkg.name.includes('Gaming') ? 'Ping stabil dan latency rendah' : 'Kecepatan hingga 42 Mbps')}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold' }}>
                      Rp {pkg.price.toLocaleString('id-ID')}
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="small"
                      disableElevation
                      onClick={() => handleViewPackage(pkg)}
                      sx={{ 
                        borderRadius: 5,
                        textTransform: 'none',
                        px: 2,
                        bgcolor: pkg.color || theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: pkg.color ? `${pkg.color}dd` : theme.palette.primary.dark
                        }
                      }}
                    >
                      Beli
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Paper>
  );
};

export default TrendingPackages;