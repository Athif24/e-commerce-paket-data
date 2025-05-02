import React, { useState, useEffect } from 'react';
import { 
  Box, Paper, Typography, Chip, CircularProgress, 
  Card, CardContent, Divider, Grid, Button, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, TablePagination, IconButton, Tooltip, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
import { MainContainer, ContentContainer } from '../../styles';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.12)',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  fontWeight: 500,
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  fontWeight: 700,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const SearchBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  minWidth: '100px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

const TransactionSummary = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
}));

const SummaryCard = styled(Card)(({ theme }) => ({
  flex: 1,
  margin: theme.spacing(0, 1),
  borderRadius: theme.spacing(2),
  textAlign: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
  '&:first-of-type': {
    marginLeft: 0,
  },
  '&:last-of-type': {
    marginRight: 0,
  },
}));

const NoTransactionsCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5),
  marginTop: theme.spacing(3),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[100],
}));

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Calculate summary statistics
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    totalSpent: 0
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (!storedUser || !storedUser.id) {
          throw new Error('User data not found');
        }
        
        const response = await axios.get(`http://localhost:3000/transactions?userId=${storedUser.id}`);
        setTransactions(response.data);
        
        // Calculate summary statistics
        const total = response.data.length;
        const active = response.data.filter(t => new Date(t.expiryDate) >= new Date()).length;
        const expired = total - active;
        const totalSpent = response.data.reduce((sum, t) => sum + t.amount, 0);
        
        setStats({ total, active, expired, totalSpent });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError(error.message || 'Error fetching transactions');
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setPage(0);
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const getStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today <= expiry ? 'Aktif' : 'Kadaluarsa';
  };

  const getStatusColor = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    return today <= expiry ? 'success' : 'error';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Filter transactions based on search query and status filter
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.id.toString().includes(search) || 
      formatDate(transaction.purchaseDate).toLowerCase().includes(search.toLowerCase());
    
    const status = getStatus(transaction.expiryDate);
    const matchesFilter = 
      filterStatus === 'all' || 
      (filterStatus === 'active' && status === 'Aktif') || 
      (filterStatus === 'expired' && status === 'Kadaluarsa');
    
    return matchesSearch && matchesFilter;
  });

  // Paginate the filtered transactions
  const paginatedTransactions = filteredTransactions.slice(
    page * rowsPerPage, 
    page * rowsPerPage + rowsPerPage
  );

  const calculateRemainingDays = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <MainContainer>
        <ContentContainer>
          <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
            <CircularProgress />
          </Box>
        </ContentContainer>
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        <ContentContainer>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
          <Button 
            variant="contained" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Coba Lagi
          </Button>
        </ContentContainer>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <ContentContainer>
        <Box mb={4}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="700" color="primary">
            Riwayat Transaksi
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Kelola dan pantau semua transaksi pembelian paket data Anda
          </Typography>
          <Divider sx={{ my: 2 }} />
        </Box>

        {/* Summary Cards */}
        <TransactionSummary>
          <SummaryCard>
            <ReceiptIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Total Transaksi</Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">{stats.total}</Typography>
          </SummaryCard>
          
          <SummaryCard>
            <EventIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Paket Aktif</Typography>
            <Typography variant="h4" color="success" fontWeight="bold">{stats.active}</Typography>
          </SummaryCard>
          
          <SummaryCard>
            <CalendarMonthIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Paket Kadaluarsa</Typography>
            <Typography variant="h4" color="error" fontWeight="bold">{stats.expired}</Typography>
          </SummaryCard>
          
          <SummaryCard>
            <PaymentsIcon color="info" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">Total Pengeluaran</Typography>
            <Typography variant="h4" color="info" fontWeight="bold">Rp {stats.totalSpent.toLocaleString('id-ID')}</Typography>
          </SummaryCard>
        </TransactionSummary>

        {/* Search and Filter */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <SearchBar>
              <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
              <TextField
                fullWidth
                variant="standard"
                placeholder="Cari berdasarkan ID transaksi atau tanggal..."
                InputProps={{ disableUnderline: true }}
                value={search}
                onChange={handleSearchChange}
              />
            </SearchBar>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant={filterStatus === 'all' ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange('all')}
                size="small"
                sx={{ mr: 1 }}
              >
                Semua
              </Button>
              <Button
                variant={filterStatus === 'active' ? 'contained' : 'outlined'}
                color="success"
                onClick={() => handleFilterChange('active')}
                size="small"
                sx={{ mr: 1 }}
              >
                Aktif
              </Button>
              <Button
                variant={filterStatus === 'expired' ? 'contained' : 'outlined'}
                color="error"
                onClick={() => handleFilterChange('expired')}
                size="small"
              >
                Kadaluarsa
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Transactions Table */}
        {filteredTransactions.length > 0 ? (
          <StyledCard>
            <StyledTableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableHeaderCell>ID Transaksi</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Tanggal Pembelian</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Masa Berlaku</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                    <StyledTableHeaderCell>Sisa Hari</StyledTableHeaderCell>
                    <StyledTableHeaderCell align="right">Total</StyledTableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedTransactions.map((transaction) => {
                    const status = getStatus(transaction.expiryDate);
                    const remainingDays = calculateRemainingDays(transaction.expiryDate);
                    
                    return (
                      <StyledTableRow key={transaction.id} hover>
                        <StyledTableCell>
                          <Box display="flex" alignItems="center">
                            <Typography variant="subtitle2" fontWeight="bold">
                              #{transaction.id}
                            </Typography>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell>{formatDate(transaction.purchaseDate)}</StyledTableCell>
                        <StyledTableCell>{formatDate(transaction.expiryDate)}</StyledTableCell>
                        <StyledTableCell>
                          <StatusChip
                            label={status}
                            color={getStatusColor(transaction.expiryDate)}
                            status={status}
                          />
                        </StyledTableCell>
                        <StyledTableCell>
                          {remainingDays > 0 ? (
                            <Typography 
                              variant="body2" 
                              fontWeight="medium"
                              color={remainingDays <= 3 ? 'error' : remainingDays <= 7 ? 'warning.main' : 'text.primary'}
                            >
                              {remainingDays} hari
                              {remainingDays <= 3 && (
                                <Tooltip title="Paket akan segera berakhir" arrow>
                                  <InfoIcon fontSize="small" color="error" sx={{ ml: 1, verticalAlign: 'middle' }} />
                                </Tooltip>
                              )}
                            </Typography>
                          ) : (
                            <Typography variant="body2" color="error">
                              Kadaluarsa
                            </Typography>
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Typography variant="body1" fontWeight="bold">
                            Rp {transaction.amount.toLocaleString('id-ID')}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredTransactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per halaman:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} dari ${count}`}
              />
            </StyledTableContainer>
          </StyledCard>
        ) : (
          <NoTransactionsCard>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Tidak ada transaksi ditemukan
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {search || filterStatus !== 'all' 
                ? 'Coba ubah filter pencarian Anda'
                : 'Anda belum memiliki riwayat transaksi'}
            </Typography>
            {(search || filterStatus !== 'all') && (
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearch('');
                  setFilterStatus('all');
                }}
              >
                Reset Filter
              </Button>
            )}
          </NoTransactionsCard>
        )}
      </ContentContainer>
    </MainContainer>
  );
};

export default Transactions;