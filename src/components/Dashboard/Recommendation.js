// Recommendation.js
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Paper,
  Chip,
  Divider,
  IconButton,
  Slide,
  useTheme,
  Grid
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RecommendIcon from '@mui/icons-material/Recommend';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WifiIcon from '@mui/icons-material/Wifi';
import SpeedIcon from '@mui/icons-material/Speed';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Recommendation = ({ recommendation, packages, onPurchase }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  
  const recommendedPackage = packages.find(pkg => pkg.id === recommendation?.packageId) || {
    id: 1,
    name: 'Paket 10GB',
    price: 25000,
    description: 'Paket paling hemat untuk kebutuhan bulanan',
    features: [
      '10GB Kuota Internet',
      'Masa berlaku 30 hari',
      'Bonus streaming tanpa kuota',
      'Paket paling populer'
    ]
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handlePurchase = () => {
    onPurchase(recommendedPackage);
    handleClose();
  };

  return (
    <>
      <Paper sx={{ 
        borderRadius: 2,
        p: 0,
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Grid container>
          {/* Left Content */}
          <Grid item xs={12} md={8}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <RecommendIcon sx={{ mr: 1, color: '#5e72e4' }} />
              </Box>
              
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {recommendedPackage.name}
              </Typography>
              
              <Typography variant="body2" sx={{ color: '#8898aa', mb: 2 }}>
                Paket paling hemat untuk kebutuhan bulanan
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mr: 1, color: '#5e72e4' }}>
                  Rp {recommendedPackage.price.toLocaleString('id-ID')}
                </Typography>
                <Chip 
                  label="HEMAT" 
                  size="small" 
                  sx={{ 
                    bgcolor: 'rgba(94, 114, 228, 0.1)', 
                    color: '#5e72e4',
                    fontWeight: 'bold',
                    fontSize: '0.7rem'
                  }} 
                />
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                mb: 3 
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WifiIcon sx={{ color: '#5e72e4', mr: 1.5 }} />
                  <Typography>10GB Kuota Internet</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ color: '#5e72e4', mr: 1.5 }} />
                  <Typography>Masa berlaku 30 hari</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SpeedIcon sx={{ color: '#5e72e4', mr: 1.5 }} />
                  <Typography>Kecepatan hingga 42 Mbps</Typography>
                </Box>
              </Box>
              
              <Box>
                <Button 
                  variant="contained" 
                  onClick={handleOpen}
                  startIcon={<ShoppingCartIcon />}
                  disableElevation
                  sx={{
                    fontWeight: 'bold',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontSize: '0.9rem',
                    bgcolor: '#5e72e4',
                    '&:hover': {
                      bgcolor: '#4454bd',
                    }
                  }}
                >
                  Beli Sekarang
                </Button>
              </Box>
            </Box>
          </Grid>
          
          {/* Right Image/Banner */}
          <Grid item xs={12} md={4} sx={{ 
            bgcolor: '#5e72e4',
            backgroundImage: 'linear-gradient(135deg, #5e72e4 0%, #825ee4 100%)',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            p: 3,
            position: 'relative'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              opacity: 0.1,
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
            <Box sx={{ zIndex: 1, textAlign: 'center' }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                10GB
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                Kuota Internet
              </Typography>
              <Chip 
                label="REKOMENDASI" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  color: 'white',
                  fontWeight: 'bold'
                }} 
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: '#5e72e4',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2
        }}>
          <Typography variant="h6" fontWeight="bold">Konfirmasi Pembelian</Typography>
          <IconButton 
            onClick={handleClose} 
            sx={{ color: 'white' }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {recommendedPackage.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {recommendedPackage.description}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ my: 2 }}>
            <Typography fontWeight="bold" gutterBottom>
              Detail Paket:
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 2 }}>
              {(recommendedPackage.features || ['10GB Kuota Internet', 'Masa berlaku 30 hari', 'Bonus streaming tanpa kuota']).map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: '#2dce89', mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography>{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1">Total Pembayaran:</Typography>
            <Typography variant="h5" fontWeight="bold" color="#5e72e4">
              Rp {recommendedPackage.price.toLocaleString('id-ID')}
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, display: 'flex', gap: 1 }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 'medium',
              borderColor: '#e9ecef',
              color: '#8898aa',
              '&:hover': {
                borderColor: '#cfd4da',
                bgcolor: '#f6f9fc'
              }
            }}
          >
            Batal
          </Button>
          <Button 
            onClick={handlePurchase} 
            variant="contained" 
            disableElevation
            sx={{ 
              borderRadius: 2,
              px: 3,
              textTransform: 'none',
              fontWeight: 'bold',
              bgcolor: '#5e72e4',
              '&:hover': {
                bgcolor: '#4454bd'
              }
            }}
          >
            Konfirmasi Pembelian
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Recommendation;