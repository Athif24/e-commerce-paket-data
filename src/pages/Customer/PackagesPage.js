import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, Alert, Typography, Fade, 
  Container, Snackbar, Paper 
} from '@mui/material';
import { 
  SimCard as SimCardIcon,
  Dns as DnsIcon,
  LightbulbOutlined as LightbulbIcon
} from '@mui/icons-material';
import PackageList from '../../components/Packages/PackageList';
import { MainContainer, ContentContainer, GradientText } from '../../styles';

const PackagesPage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [activePackages, setActivePackages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        // Get packages
        const packagesRes = await axios.get('http://localhost:3000/packages');
        setPackages(packagesRes.data);
        
        // Get active packages
        const activeRes = await axios.get(`http://localhost:3000/activePackages?userId=${storedUser.id}`);
        setActivePackages(activeRes.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePurchase = async (pkg) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const today = new Date();
      let expiryDate = new Date();
      
      const validityDays = parseInt(pkg.validity.split(' ')[0]);
      expiryDate.setDate(today.getDate() + validityDays);
      
      const formatDate = (date) => date.toISOString().split('T')[0];
      
      await axios.post('http://localhost:3000/activePackages', {
        userId: storedUser.id,
        packageId: pkg.id,
        purchaseDate: formatDate(today),
        expiryDate: formatDate(expiryDate),
        status: 'active',
      });
      
      await axios.post('http://localhost:3000/transactions', {
        userId: storedUser.id,
        packageId: pkg.id,
        purchaseDate: formatDate(today),
        expiryDate: formatDate(expiryDate),
        status: 'completed',
        amount: pkg.price,
      });
      
      setSuccess(`Paket ${pkg.name} berhasil dibeli!`);
      setOpenSnackbar(true);
      
      // Refresh active packages
      const activeRes = await axios.get(`http://localhost:3000/activePackages?userId=${storedUser.id}`);
      setActivePackages(activeRes.data);
    } catch (error) {
      console.error('Error purchasing package:', error);
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) return (
    <MainContainer>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <Typography variant="h5" color="text.secondary">Loading...</Typography>
      </Container>
    </MainContainer>
  );

  return (
    <MainContainer>
      <ContentContainer>
        <PackageList packages={packages} onPurchase={handlePurchase} />
        
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity="success" 
            variant="filled"
            sx={{ width: '100%' }}
          >
            {success}
          </Alert>
        </Snackbar>
      </ContentContainer>
    </MainContainer>
  );
};

export default PackagesPage;