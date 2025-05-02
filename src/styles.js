// import { styled } from '@mui/material/styles';

// export const MainContainer = styled('main')(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   marginTop: '64px',
//   backgroundColor: '#f5f7fa',
//   minHeight: 'calc(100vh - 64px)',
// }));

// export const ContentContainer = styled('div')(({ theme }) => ({
//   padding: theme.spacing(2),
//   backgroundColor: '#fff',
//   borderRadius: theme.shape.borderRadius,
//   boxShadow: theme.shadows[1],
//   [theme.breakpoints.up('md')]: {
//     padding: theme.spacing(3),
//   },
// }));

// src/styles.js
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Button } from '@mui/material';

export const MainContainer = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: '64px',
  backgroundImage: theme.palette.background.gradient,
  backgroundAttachment: 'fixed',
  minHeight: 'calc(100vh - 64px)',
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: 'transparent',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(3),
  },
}));

export const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #7E57C2 30%, #03A9F4 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
  fontWeight: 700,
}));

export const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(26, 31, 53, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  padding: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #7E57C2, #03A9F4)',
    borderRadius: '4px 4px 0 0',
  },
}));

export const PackageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  },
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: '700px',
  margin: '0 auto',
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
  },
}));

export const PurchaseButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 3,
  padding: '8px 24px',
  fontSize: '0.9rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 4px 14px rgba(126, 87, 194, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(126, 87, 194, 0.6)',
    transform: 'translateY(-2px)',
  },
}));

export const FeaturesList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '& li': {
    padding: '8px 0',
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      marginRight: theme.spacing(1.5),
      color: theme.palette.primary.main,
    },
  },
}));