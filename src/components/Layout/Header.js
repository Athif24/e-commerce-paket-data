import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  IconButton,
  Box,
  Avatar,
  Badge,
  Stack,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  History as HistoryIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon sx={{ mr: 1 }} />, 
      path: '/customer/dashboard',
      color: '#fff' 
    },
    { 
      text: 'Daftar Paket', 
      icon: <ShoppingCartIcon sx={{ mr: 1 }} />, 
      path: '/customer/packages',
      color: '#fff' 
    },
    { 
      text: 'Riwayat', 
      icon: <HistoryIcon sx={{ mr: 1 }} />, 
      path: '/customer/transactions',
      color: '#fff' 
    },
  ];

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px'
      }}>
        {/* Logo dan Nama Perusahaan */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9
            }
          }}
          onClick={() => navigate('/customer/dashboard')}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h6" component="div" sx={{ 
              fontWeight: 700,
              letterSpacing: '0.5px',
              color: '#fff',
              fontSize: '1.5rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              E-Commerce Paket Data
            </Typography>
          </motion.div>
        </Box>

        {/* Menu Navigasi */}
        <Stack 
          direction="row" 
          spacing={1}
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            height: '100%'
          }}
        >
          {menuItems.map((item) => (
            <motion.div 
              key={item.text}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  height: '100%',
                  borderRadius: 0,
                  px: 3,
                  color: item.color,
                  borderBottom: '3px solid transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderBottom: '3px solid rgba(255,255,255,0.5)',
                  },
                  '&.active': {
                    borderBottom: '3px solid #fff',
                  }
                }}
              >
                {item.text}
              </Button>
            </motion.div>
          ))}
        </Stack>

        {/* Bagian Kanan Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={handleClick}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              px: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            <AccountCircleIcon />
            <Typography variant="body1" sx={{ 
              fontWeight: 500,
              color: '#fff'
            }}>
              {user?.name || 'Profile'}
            </Typography>
          </Button>
          
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 4,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.2))',
                mt: 1.5,
                minWidth: 180,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => {
              handleClose();
              handleLogout();
            }}>
              <LogoutIcon sx={{ mr: 1, color: '#667eea' }} /> Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;