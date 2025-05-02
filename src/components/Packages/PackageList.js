import React from 'react';
import { Grid, Box } from '@mui/material';
import PackageCard from './PackageCard';
import { PageTitle, PageSubtitle } from '../../styles';

const PackageList = ({ packages, onPurchase }) => {
  // Find popular package - usually the middle one or the one with most features
  const getPopularPackage = () => {
    if (packages.length >= 3) {
      // If we have enough packages, assume the middle one is popular
      return packages[Math.floor(packages.length / 2)].id;
    } else if (packages.length > 0) {
      // Otherwise, choose the most expensive package
      return packages.reduce((prev, current) => 
        (prev.price > current.price) ? prev : current
      ).id;
    }
    return null;
  };

  const popularPackageId = getPopularPackage();

  return (
    <Box sx={{ pt: 2, pb: 6 }}>
      <PageTitle variant="h3">
        Pilih Paket Data Anda
      </PageTitle>
      <PageSubtitle variant="body1">
        Nikmati akses internet cepat tanpa batas dengan paket data yang sesuai kebutuhan Anda.
        Pilih dari berbagai opsi paket yang kami tawarkan untuk pengalaman internet terbaik.
      </PageSubtitle>
      
      <Grid container spacing={3} justifyContent="center">
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <PackageCard 
              pkg={pkg} 
              onPurchase={onPurchase} 
              popular={pkg.id === popularPackageId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PackageList;