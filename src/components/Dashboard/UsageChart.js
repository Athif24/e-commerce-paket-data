// UsageChart.js
import React, { useState } from 'react';
import { Box, Typography, Paper, ToggleButtonGroup, ToggleButton, Tooltip } from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// Default data if none provided
const defaultData = [
  { name: 'Sen', usage: 0.55 },
  { name: 'Sel', usage: 0.65 },
  { name: 'Rab', usage: 0.8 },
  { name: 'Kam', usage: 0.95 },
  { name: 'Jum', usage: 1.3 },
  { name: 'Sab', usage: 1.75 },
  { name: 'Min', usage: 1.45 },
];

const weeklyData = [
  { name: 'Minggu 1', usage: 8.2 },
  { name: 'Minggu 2', usage: 5.7 },
  { name: 'Minggu 3', usage: 9.3 },
  { name: 'Minggu 4', usage: 7.8 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.95)',
          p: 1.5,
          borderRadius: 1,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 'medium' }}>
          {`${payload[0].value} GB`}
        </Typography>
      </Box>
    );
  }
  return null;
};

const UsageChart = ({ data }) => {
  const [timeRange, setTimeRange] = useState('daily');
  
  const chartData = data || (timeRange === 'daily' ? defaultData : weeklyData);
  
  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };
  
  // Calculate average usage
  const calculateAverage = (data) => {
    if (!data || data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.usage, 0);
    return (sum / data.length).toFixed(2);
  };
  
  const avgUsage = calculateAverage(chartData);
  
  return (
    <Paper sx={{ 
      backgroundColor: 'white',
      borderRadius: 2,
      p: 3,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(135deg, rgba(25, 118, 210, 0.03) 0%, rgba(25, 118, 210, 0.1) 100%)'
    }}>
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #1976d2, #64b5f6)',
        }}
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InsertChartIcon sx={{ fontSize: 28, color: '#1976d2', mr: 1.5 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
            Pemakaian Quota
          </Typography>
        </Box>
        
        <ToggleButtonGroup
          value={timeRange}
          exclusive
          onChange={handleTimeRangeChange}
          size="small"
          sx={{ 
            '& .MuiToggleButton-root': {
              textTransform: 'none',
              fontSize: '0.75rem',
              px: 1,
              py: 0.5
            },
            '& .Mui-selected': {
              bgcolor: 'rgba(25, 118, 210, 0.1) !important',
              color: '#1976d2 !important',
              fontWeight: 'bold'
            }
          }}
        >
          <ToggleButton value="daily">Harian</ToggleButton>
          <ToggleButton value="weekly">Mingguan</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TrendingUpIcon sx={{ fontSize: 20, color: '#546e7a', mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          Rata-rata: <span style={{ fontWeight: 'bold' }}>{avgUsage} GB</span>
        </Typography>
        
        <Tooltip 
          title={`Rata-rata pemakaian data ${timeRange === 'daily' ? 'harian' : 'mingguan'} Anda`} 
          placement="top"
          arrow
        >
          <InfoOutlinedIcon sx={{ fontSize: 16, ml: 1, color: '#78909c', cursor: 'help' }} />
        </Tooltip>
      </Box>
      
      <Box sx={{ height: 220, mt: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.06)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#546e7a' }}
            />
            <YAxis 
              domain={[0, timeRange === 'daily' ? 2.5 : 12]} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: '#546e7a' }}
              tickFormatter={(value) => `${value}`}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="usage" 
              name="Pemakaian"
              fill="#1976d2"
              radius={[4, 4, 0, 0]}
              barSize={timeRange === 'daily' ? 20 : 35}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Legend
              wrapperStyle={{ fontSize: '12px', marginTop: '8px' }}
              formatter={(value) => (
                <span style={{ color: '#546e7a', fontWeight: 'medium' }}>{value}</span>
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default UsageChart;