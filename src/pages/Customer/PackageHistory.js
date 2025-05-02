import React, { useState, useEffect } from 'react';
import { 
  Box, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip, Typography, 
  Card, CardContent, CircularProgress, Divider,
  Button, IconButton, Tooltip, MenuItem, Menu
} from '@mui/material';
import {
  History as HistoryIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Archive as ArchiveIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import axios from 'axios';
import { MainContainer, ContentContainer } from '../../styles';

const PackageHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleFilterClose = (filterValue) => {
    if (filterValue) {
      setFilter(filterValue);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await axios.get(`http://localhost:3000/packageHistory?userId=${user.id}`);
        setHistory(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching package history:', error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'expired': return 'error';
      case 'replaced': return 'warning';
      case 'active': return 'success';
      default: return 'default';
    }
  };
  
  const getStatusLabel = (status) => {
    switch(status) {
      case 'expired': return 'Kadaluarsa';
      case 'replaced': return 'Diganti';
      case 'active': return 'Aktif';
      default: return status;
    }
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const calculateDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Filter history items
  let filteredHistory = [...history];
  if (filter === 'expired') {
    filteredHistory = history.filter(item => item.status === 'expired');
  } else if (filter === 'replaced') {
    filteredHistory = history.filter(item => item.status === 'replaced');
  } else if (filter === 'active') {
    filteredHistory = history.filter(item => item.status === 'active');
  }
  
  // Sort history items
  filteredHistory.sort((a, b) => {
    const dateA = new Date(a.purchaseDate);
    const dateB = new Date(b.purchaseDate);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });
  
  const filterOpen = Boolean(anchorEl);

  if (loading) {
    return (
      <MainContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress />
        </Box>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <ContentContainer>
        <Card elevation={3} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" fontWeight="500">Riwayat Paket</Typography>
              </Box>
              
              <Box>
                <Tooltip title="Filter berdasarkan status">
                  <IconButton onClick={handleFilterClick}>
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={filterOpen}
                  onClose={() => handleFilterClose()}
                >
                  <MenuItem onClick={() => handleFilterClose('all')}>Semua</MenuItem>
                  <MenuItem onClick={() => handleFilterClose('active')}>Aktif</MenuItem>
                  <MenuItem onClick={() => handleFilterClose('expired')}>Kadaluarsa</MenuItem>
                  <MenuItem onClick={() => handleFilterClose('replaced')}>Diganti</MenuItem>
                </Menu>
                
                <Tooltip title={`Urutkan ${sortOrder === 'asc' ? 'terlama' : 'terbaru'}`}>
                  <IconButton onClick={toggleSortOrder}>
                    <SortIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Unduh riwayat">
                  <IconButton>
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
                
                <Tooltip title="Arsip">
                  <IconButton>
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Menampilkan {filteredHistory.length} riwayat paket {filter !== 'all' ? `dengan status: ${getStatusLabel(filter)}` : ''}
            </Typography>
            
            {filteredHistory.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Typography variant="body1" color="text.secondary">
                  Tidak ada riwayat paket yang ditemukan.
                </Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} sx={{ boxShadow: 'none', border: '1px solid #e0e0e0', borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                      <TableCell sx={{ fontWeight: 'bold' }}>Nama Paket</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Tanggal Pembelian</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Berlaku Hingga</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Sisa Waktu</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredHistory.map((item) => {
                      const daysLeft = calculateDaysLeft(item.expiryDate);
                      return (
                        <TableRow 
                          key={item.id} 
                          hover
                          sx={{ 
                            '&:last-child td, &:last-child th': { border: 0 },
                            backgroundColor: item.status === 'active' ? 'rgba(76, 175, 80, 0.04)' : 'inherit'
                          }}
                        >
                          <TableCell>
                            <Typography variant="body1" fontWeight="500">
                              {item.name || `Paket #${item.packageId}`}
                            </Typography>
                            {item.description && (
                              <Typography variant="body2" color="text.secondary">
                                {item.description}
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(item.purchaseDate)}</TableCell>
                          <TableCell>{formatDate(item.expiryDate)}</TableCell>
                          <TableCell>
                            {item.status === 'active' ? (
                              daysLeft > 0 ? (
                                <Typography 
                                  variant="body2" 
                                  color={daysLeft <= 7 ? 'error.main' : 'text.primary'}
                                >
                                  {daysLeft} hari lagi
                                </Typography>
                              ) : 'Hari ini berakhir'
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={getStatusLabel(item.status)} 
                              color={getStatusColor(item.status)}
                              size="small"
                              sx={{ minWidth: '90px' }}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" color="primary">
                Lihat Lebih Banyak
              </Button>
            </Box>
          </CardContent>
        </Card>
      </ContentContainer>
    </MainContainer>
  );
};

export default PackageHistory;