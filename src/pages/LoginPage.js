import React, { useState } from 'react';
import { 
  Container,
  Typography,
  Box
} from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async ({ phone, password }) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: { phone }
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === password) {
          localStorage.setItem('user', JSON.stringify(user));
          setTimeout(() => {
            navigate('/customer/dashboard');
          }, 1000);
        } else {
          setError('Password salah');
        }
      } else {
        setError('Nomor HP tidak terdaftar');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container 
      maxWidth={false} 
      disableGutters
      sx={{ 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
      }}
    >
      <LoginForm 
        onSubmit={handleLoginSubmit} 
        isLoading={isLoading} 
        error={error} 
      />
      
      {/* Marketing tagline - positioned absolutely at bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          color: 'white',
          textAlign: 'center',
          width: '100%',
          px: 2
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          Beli Paket Data Internet Terbaik dengan Harga Terjangkau
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Nikmati kecepatan tinggi dan jaringan stabil di seluruh Indonesia
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;