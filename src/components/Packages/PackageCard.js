import React, { useState } from 'react';
import { 
  Box, Typography, Dialog, DialogTitle, DialogContent, 
  DialogActions, Divider, Fade 
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { GlassCard, PurchaseButton, FeaturesList } from '../../styles';

const PackageCard = ({ pkg, onPurchase, popular = false }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onPurchase(pkg);
    handleClose();
  };

  // Extract features from description
  const getFeatures = () => {
    const basicFeature = pkg.description
      ? pkg.description.split('.')[0]
      : `${pkg.name} untuk penggunaan harian`;
    
    const features = [];
    features.push(basicFeature);
    
    if (pkg.validity) {
      features.push(`Masa berlaku ${pkg.validity}`);
    }
    
    // Generate features based on package type
    if (pkg.name.toLowerCase().includes('harian')) {
      features.push('Cocok untuk penggunaan ringan');
    } else if (pkg.name.toLowerCase().includes('mingguan')) {
      features.push('Ideal untuk penggunaan sedang');
      features.push('Hemat hingga 20%');
    } else if (pkg.name.toLowerCase().includes('bulanan')) {
      features.push('Optimal untuk penggunaan sehari-hari');
      features.push('Hemat hingga 30%');
      features.push('Prioritas jaringan'); 
    } else if (pkg.name.toLowerCase().includes('gaming')) {
      features.push('Prioritas jaringan untuk gaming');
      features.push('Ping stabil dan latency rendah');
      features.push('Akses VIP untuk game online');
    }
    
    return features;
  };

  const features = getFeatures();

  return (
    <>
      <Fade in={true} style={{ transitionDelay: '100ms' }}>
        <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
          {popular && (
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                backgroundColor: 'secondary.main',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                zIndex: 1,
              }}
            >
              Popular
            </Box>
          )}
          
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {pkg.name}
            </Typography>
            
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
              Rp {pkg.price.toLocaleString()}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {pkg.validity || 'Unlimited'}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <FeaturesList>
              {features.map((feature, index) => (
                <li key={index}>
                  <CheckIcon fontSize="small" />
                  <Typography variant="body2">{feature}</Typography>
                </li>
              ))}
            </FeaturesList>
          </Box>
          
          <Box sx={{ mt: 'auto', p: 2, pt: 0 }}>
            <PurchaseButton 
              variant="contained" 
              fullWidth 
              onClick={handleOpen}
              color="primary"
            >
              Beli Sekarang
            </PurchaseButton>
          </Box>
        </GlassCard>
      </Fade>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: { 
            backgroundColor: 'background.paper',
            backgroundImage: 'none',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6">Konfirmasi Pembelian</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography gutterBottom>Anda akan membeli:</Typography>
          <Typography variant="h6" gutterBottom>{pkg.name}</Typography>
          <Typography gutterBottom>{pkg.description}</Typography>
          <Typography variant="h6" gutterBottom color="primary">
            Rp {pkg.price.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {pkg.validity || 'Unlimited'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <PurchaseButton onClick={handleClose} color="inherit" variant="outlined">
            Batal
          </PurchaseButton>
          <PurchaseButton onClick={handleConfirm} variant="contained" color="primary">
            Konfirmasi
          </PurchaseButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PackageCard;