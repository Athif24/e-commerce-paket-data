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
  useTheme
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
        borderRadius: 3,
        p: 0,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.12)',
        }
      }}>
        {/* Header with gradient */}
        <Box sx={{ 
          backgroundColor: theme.palette.primary.main,
          backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          p: 3,
          position: 'relative',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <RecommendIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
              Rekomendasi Paket
            </Typography>
          </Box>
          
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
            {recommendedPackage.name}
          </Typography>
          
          <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
            Paket paling hemat untuk kebutuhan bulanan
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mr: 1 }}>
              Rp {recommendedPackage.price.toLocaleString('id-ID')}
            </Typography>
            <Chip 
              label="HEMAT" 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.7rem'
              }} 
            />
          </Box>
        </Box>
        
        {/* Content body */}
        <Box sx={{ p: 3, bgcolor: 'white' }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2,
            mb: 3 
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WifiIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
              <Typography>10GB Kuota Internet</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
              <Typography>Masa berlaku 30 hari</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <SpeedIcon sx={{ color: theme.palette.primary.main, mr: 1.5 }} />
              <Typography>Kecepatan hingga 42 Mbps</Typography>
            </Box>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 2 
            }}
          >
            <Button 
              variant="contained" 
              onClick={handleOpen}
              size="large"
              startIcon={<ShoppingCartIcon />}
              disableElevation
              sx={{
                fontWeight: 'bold',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                bgcolor: theme.palette.primary.main,
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                  transform: 'scale(1.03)'
                }
              }}
            >
              Beli Sekarang
            </Button>
          </Box>
        </Box>
      </Paper>

      <Dialog 
        open={open} 
        onClose={handleClose} 
        maxWidth="sm" 
        fullWidth
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: theme.palette.primary.main,
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
                  <CheckCircleIcon sx={{ color: theme.palette.success.main, mr: 1.5, fontSize: '1.2rem' }} />
                  <Typography>{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="body1">Total Pembayaran:</Typography>
            <Typography variant="h5" fontWeight="bold" color="primary">
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
              borderColor: theme.palette.grey[300],
              color: theme.palette.text.primary,
              '&:hover': {
                borderColor: theme.palette.grey[400],
                bgcolor: theme.palette.grey[50]
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
              bgcolor: theme.palette.primary.main,
              '&:hover': {
                bgcolor: theme.palette.primary.dark
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