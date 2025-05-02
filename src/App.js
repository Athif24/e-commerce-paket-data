// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import Dashboard from './pages/Customer/Dashboard';
// import PackagesPage from './pages/Customer/PackagesPage';
// import Transactions from './pages/Customer/Transactions';
// import Header from './components/Layout/Header';
// import Sidebar from './components/Layout/Sidebar';
// import { Box } from '@mui/material';

// // Tambahkan ini di bagian atas file
// const drawerWidth = 240;

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('user');
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// const App = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/customer/*"
//           element={
//             <PrivateRoute>
//               <Box sx={{ display: 'flex' }}>
//                 <Header handleDrawerToggle={handleDrawerToggle} />
//                 <Sidebar 
//                   mobileOpen={mobileOpen} 
//                   handleDrawerToggle={handleDrawerToggle} 
//                 />
//                 <Box
//                   component="main"
//                   sx={{
//                     flexGrow: 1,
//                     p: 3,
//                     width: { sm: `calc(100% - ${drawerWidth}px)` },
//                     marginTop: '64px'
//                   }}
//                 >
//                   <Routes>
//                     <Route path="dashboard" element={<Dashboard />} />
//                     <Route path="packages" element={<PackagesPage />} />
//                     <Route path="transactions" element={<Transactions />} />
//                     <Route path="*" element={<Navigate to="dashboard" />} />
//                   </Routes>
//                 </Box>
//               </Box>
//             </PrivateRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Customer/Dashboard';
import PackagesPage from './pages/Customer/PackagesPage';
import Transactions from './pages/Customer/Transactions';
import Header from './components/Layout/Header';
import { Box } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/customer/*"
          element={
            <PrivateRoute>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Box
                  component="main"
                  sx={{
                    flexGrow: 1,
                    p: 3,
                    marginTop: '64px',
                    backgroundColor: '#f5f7fa'
                  }}
                >
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="packages" element={<PackagesPage />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="*" element={<Navigate to="dashboard" />} />
                  </Routes>
                </Box>
              </Box>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;