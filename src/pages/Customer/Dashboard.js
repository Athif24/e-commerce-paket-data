// Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Container,
  Alert,
  useTheme,
  useMediaQuery,
  Grow,
  Typography,
  CircularProgress,
  Paper,
  Divider
} from '@mui/material';
import { motion } from 'framer-motion';
import UserGreeting from '../../components/Dashboard/UserGreeting';
import QuotaInfo from '../../components/Dashboard/QuotaInfo';
import Recommendation from '../../components/Dashboard/Recommendation';
import UsageChart from '../../components/Dashboard/UsageChart';
import TrendingPackages from '../../components/Dashboard/TrendingPackages';

// Mengimpor data dummy langsung untuk fallback
import dummyData from '../../db.json';

// Animation variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

// Helper function untuk kalkulasi penggunaan
const generateUsageData = () => {
  return [
    { name: 'Sen', usage: Math.random() * 0.7 + 0.3 },
    { name: 'Sel', usage: Math.random() * 0.7 + 0.3 },
    { name: 'Rab', usage: Math.random() * 0.7 + 0.3 },
    { name: 'Kam', usage: Math.random() * 0.7 + 0.3 },
    { name: 'Jum', usage: Math.random() * 0.7 + 0.3 },
    { name: 'Sab', usage: Math.random() * 1 + 0.4 },
    { name: 'Min', usage: Math.random() * 1 + 0.4 },
  ];
};

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [usageData, setUsageData] = useState([]);
  const [activePackages, setActivePackages] = useState([]);

  useEffect(() => {
    // Fungsi untuk mengambil data dari API atau fallback ke data dummy
    const fetchData = async () => {
      try {
        // Simulasi loading dengan delay kecil untuk UX yang lebih baik
        setTimeout(() => {
          // Menggunakan data langsung dari db.json
          const userData = dummyData.users[0];
          // Tambahkan data penggunaan yang digenerate ke user
          userData.usageData = generateUsageData();
          setUser(userData);

          // Mengambil data paket
          const packagesData = dummyData.packages;
          setPackages(packagesData);

          // Mengambil rekomendasi
          const recommendationData = dummyData.recommendations[0];
          setRecommendation(recommendationData);

          // Mengambil paket aktif
          const activePackagesData = dummyData.activePackages.filter(
            pkg => pkg.userId === userData.id && pkg.status === 'active'
          );
          setActivePackages(activePackagesData);

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fungsi untuk mendapatkan kuota paket berdasarkan nama atau deskripsi
  const getPackageQuota = (packageData) => {
    if (!packageData) return 0;
    
    // Ekstrak angka dari nama paket atau deskripsi
    // Contoh: "Paket 10GB" -> 10, atau "5GB/minggu" -> 5
    const quotaMatch = packageData.name.match(/(\d+)GB/) ||
      packageData.description.match(/(\d+)GB/);
    
    return quotaMatch ? parseFloat(quotaMatch[1]) : 0;
  };

  const handlePurchase = async (pkg) => {
    try {
      setLoading(true);
      
      // Gunakan data dari state
      const storedUser = user;
      const today = new Date();
      const expiryDate = new Date();
      
      // Ekstrak jumlah hari dari validitas paket
      const validityDays = parseInt(pkg.validity?.split(' ')[0] || 30);
      expiryDate.setDate(today.getDate() + validityDays);
      
      const formatDate = (date) => date.toISOString().split('T')[0];

      // Buat ID unik untuk transaksi dan paket aktif baru
      const newTransactionId = `tr-${Date.now()}`;
      const newActivePackageId = `pkg-${Date.now()}`;

      // Simulasi pembuatan transaksi baru
      const newTransaction = {
        id: newTransactionId,
        userId: storedUser.id,
        packageId: pkg.id,
        purchaseDate: formatDate(today),
        expiryDate: formatDate(expiryDate),
        status: 'completed',
        amount: pkg.price
      };

      // Simulasi pembuatan paket aktif baru
      const newActivePackage = {
        id: newActivePackageId,
        userId: storedUser.id,
        packageId: pkg.id,
        purchaseDate: formatDate(today),
        expiryDate: formatDate(expiryDate),
        status: 'active'
      };

      // Dapatkan kuota dari paket yang dibeli
      const packageQuota = getPackageQuota(pkg);
      
      // Perbarui data pengguna (tambahkan kuota)
      const updatedUser = {
        ...storedUser,
        remainingQuota: storedUser.remainingQuota + packageQuota,
        expiryDate: formatDate(expiryDate) // Perbarui tanggal kedaluwarsa
      };

      // Update state dengan data yang baru
      setUser(updatedUser);
      setActivePackages([...activePackages, newActivePackage]);
      
      // Tampilkan pesan sukses
      setSuccess(`Paket ${pkg.name} berhasil dibeli! Kuota Anda telah diperbarui menjadi ${updatedUser.remainingQuota} ${updatedUser.quotaUnit}`);
      setTimeout(() => setSuccess(''), 5000);
      
      setLoading(false);
    } catch (error) {
      console.error('Error purchasing package:', error);
      setError('Gagal melakukan pembelian. Silakan coba lagi nanti.');
      setLoading(false);
    }
  };

  // Find a second recommendation package
  const secondRecommendedPackage = packages.find(pkg => 
    pkg.id !== recommendation?.packageId && 
    (pkg.category === 'recommended' || pkg.price > 0)
  );

  return (
    <Container
      maxWidth="xl"
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        py: 3,
        px: { xs: 2, sm: 3, md: 3 },
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        bgcolor: '#f5f7fa'
      }}
    >
      {success && (
        <Grow in={Boolean(success)}>
          <Box sx={{ mb: 3, width: '100%' }}>
            <Alert
              severity="success"
              variant="filled"
              sx={{
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(0, 200, 83, 0.15)',
              }}
            >
              {success}
            </Alert>
          </Box>
        </Grow>
      )}

      {error && (
        <Grow in={Boolean(error)}>
          <Box sx={{ mb: 3, width: '100%' }}>
            <Alert
              severity="error"
              variant="filled"
              sx={{
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.15)'
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          </Box>
        </Grow>
      )}

      {/* Top Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Combined UserGreeting and QuotaInfo */}
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <Paper sx={{ 
            backgroundColor: 'white',
            borderRadius: 2,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.06)',
            height: '100%',
            overflow: 'hidden'
          }}>
            {/* UserGreeting section */}
            <Box sx={{ p: 3 }}>
              <UserGreeting user={user} insideCombinedCard={true} />
            </Box>
            
            <Divider sx={{ mx: 3 }} />
            
            {/* QuotaInfo section */}
            <Box sx={{ p: 3 }}>
              <QuotaInfo 
                user={user} 
                activePackages={activePackages}
                packages={packages}
                insideCombinedCard={true}
              />
            </Box>
          </Paper>
        </Grid>
        
        {/* UsageChart */}
        <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
          <UsageChart data={user?.usageData} />
        </Grid>
      </Grid>

      {/* Middle Row - Recommendations */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, pl: 1 }}>
          Rekomendasi Paket Data
        </Typography>
        <Grid container spacing={3}>
          {/* First Recommendation */}
          <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
            <Recommendation
              recommendation={recommendation}
              packages={packages}
              onPurchase={handlePurchase}
              loading={loading}
            />
          </Grid>
          
          {/* Second Recommendation */}
          <Grid item xs={12} md={6} component={motion.div} variants={itemVariants}>
            {secondRecommendedPackage && (
              <Recommendation
                recommendation={{ packageId: secondRecommendedPackage.id }}
                packages={packages}
                onPurchase={handlePurchase}
                loading={loading}
              />
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Bottom Row - Trending Packages */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, pl: 1 }}>
          Trending Paket Data
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} component={motion.div} variants={itemVariants}>
            <TrendingPackages 
              packages={packages} 
              onPurchase={handlePurchase}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;