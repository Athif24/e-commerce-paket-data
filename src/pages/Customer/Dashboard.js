// Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Container,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Grow,
  Typography,
  CircularProgress
} from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import UserGreeting from '../../components/Dashboard/UserGreeting';
import QuotaInfo from '../../components/Dashboard/QuotaInfo';
import Recommendation from '../../components/Dashboard/Recommendation';
import UsageChart from '../../components/Dashboard/UsageChart';
import TrendingPackages from '../../components/Dashboard/TrendingPackages';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate loading with a small delay for better UX
        setTimeout(async () => {
          // Fetch user data
          const userRes = await axios.get('http://localhost:3000/users/1');
          setUser(userRes.data);

          // Fetch packages
          const packagesRes = await axios.get('http://localhost:3000/packages');
          setPackages(packagesRes.data);

          // Fetch recommendation
          const recommendationRes = await axios.get('http://localhost:3000/recommendations/1');
          setRecommendation(recommendationRes.data);

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

  const handlePurchase = async (pkg) => {
    try {
      setLoading(true);
      const storedUser = JSON.parse(localStorage.getItem('user')) || user;
      const today = new Date();
      const expiryDate = new Date();
      expiryDate.setDate(today.getDate() + parseInt(pkg.validity?.split(' ')[0] || 30));
      const formatDate = (date) => date.toISOString().split('T')[0];

      // Setelah membuat transaksi
      await axios.post('http://localhost:3000/transactions', {
        userId: storedUser.id,
        packageId: pkg.id,
        purchaseDate: formatDate(today),
        expiryDate: formatDate(expiryDate),
        status: 'completed',
        amount: pkg.price
      });

      // Tambahkan fungsi untuk mendapatkan kuota paket
      const getPackageQuota = (packageId) => {
        const packageData = packages.find(p => p.id === packageId);
        // Ekstrak angka dari nama paket atau deskripsi
        // Contoh: "Paket 10GB" -> 10
        const quotaMatch = packageData?.name.match(/(\d+)GB/) ||
          packageData?.description.match(/(\d+)GB/);
        return quotaMatch ? parseFloat(quotaMatch[1]) : 0;
      };

      // Perbarui data pengguna (menambahkan kuota)
      const packageQuota = getPackageQuota(pkg.id);
      const updatedQuota = user.remainingQuota + packageQuota;

      await axios.patch(`http://localhost:3000/users/${storedUser.id}`, {
        remainingQuota: updatedQuota,
        expiryDate: formatDate(expiryDate) // Perbarui tanggal kedaluwarsa
      });

      setSuccess(`Paket ${pkg.name} berhasil dibeli! Quota Anda telah diperbarui.`);
      setTimeout(() => setSuccess(''), 5000);

      // Kemudian refresh data pengguna
      const userRes = await axios.get(`http://localhost:3000/users/${storedUser.id}`);
      setUser(userRes.data);

      setLoading(false);
    } catch (error) {
      console.error('Error purchasing package:', error);
      setError('Gagal melakukan pembelian. Silakan coba lagi nanti.');
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Memuat dashboard Anda...
        </Typography>
      </Box>
    );
  }

  return (
    <Container
      maxWidth={isLargeScreen ? "lg" : "md"}
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        py: 4,
        px: { xs: 2, sm: 3, md: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
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

      <Grid
        container
        spacing={3}
        sx={{
          justifyContent: 'center',
          width: '100%',
          maxWidth: isLargeScreen ? 1200 : '100%'
        }}
      >
        <Grid container item xs={12} spacing={3} sx={{ justifyContent: 'center' }}>
          {/* Left side (stacked components) */}
          <Grid item xs={12} md={6} lg={6} container direction="column" spacing={3}>
            {/* Top Left - User Greeting */}
            <Grid item component={motion.div} variants={itemVariants}>
              <UserGreeting user={user} />
            </Grid>

            {/* Bottom Left - Quota Info */}
            <Grid item component={motion.div} variants={itemVariants}>
              <QuotaInfo user={user} />
            </Grid>
          </Grid>

          {/* Right side (Recommendation - tall card) */}
          <Grid item xs={12} md={6} lg={6} component={motion.div} variants={itemVariants}>
            <Box sx={{ height: '100%' }}>
              <Recommendation
                recommendation={recommendation}
                packages={packages}
                onPurchase={handlePurchase}
                loading={loading}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Second row */}
        <Grid container item xs={12} spacing={3} sx={{ justifyContent: 'center', mt: 1 }}>
          {/* Left (Usage Chart) */}
          <Grid item xs={12} md={6} lg={6} component={motion.div} variants={itemVariants}>
            <UsageChart data={user?.usageData} />
          </Grid>

          {/* Right (Trending Packages) */}
          <Grid item xs={12} md={6} lg={6} component={motion.div} variants={itemVariants}>
            <TrendingPackages packages={packages} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;