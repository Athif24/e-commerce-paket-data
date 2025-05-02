import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Button, ButtonGroup } from '@mui/material';
import { BarChart as BarChartIcon, Language, TimelineRounded } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for usage chart
const dailyData = [
  { name: 'Sen', usage: 0.8 },
  { name: 'Sel', usage: 0.5 },
  { name: 'Rab', usage: 1.2 },
  { name: 'Kam', usage: 0.9 },
  { name: 'Jum', usage: 1.3 },
  { name: 'Sab', usage: 1.7 },
  { name: 'Min', usage: 0.6 },
];

const weeklyData = [
  { name: 'Minggu 1', usage: 3.5 },
  { name: 'Minggu 2', usage: 4.2 },
  { name: 'Minggu 3', usage: 2.8 },
  { name: 'Minggu 4', usage: 1.9 },
];

const monthlyData = [
  { name: 'Jan', usage: 12.3 },
  { name: 'Feb', usage: 10.5 },
  { name: 'Mar', usage: 14.2 },
  { name: 'Apr', usage: 9.8 },
  { name: 'Mei', usage: 8.5 },
];

const UsageChart = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [timeRange, setTimeRange] = useState('daily');
  
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };
  
  // Get data based on selected time range
  const getChartData = () => {
    switch(timeRange) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };
  
  // Get title based on time range
  const getChartTitle = () => {
    switch(timeRange) {
      case 'weekly':
        return 'Penggunaan Mingguan';
      case 'monthly':
        return 'Penggunaan Bulanan';
      default:
        return 'Penggunaan Harian';
    }
  };
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'white',
            p: 1.5,
            border: '1px solid #e9ecef',
            borderRadius: 1,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            {payload[0].payload.name}
          </Typography>
          <Typography variant="body2" color="#5e72e4">
            {payload[0].value.toFixed(1)} GB
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Pemakaian Kuota
        </Typography>
        
        <ButtonGroup variant="outlined" size="small">
          <Button 
            onClick={() => handleTimeRangeChange('daily')}
            sx={{ 
              bgcolor: timeRange === 'daily' ? '#5e72e4' : 'transparent',
              color: timeRange === 'daily' ? 'white' : '#5e72e4',
              '&:hover': {
                bgcolor: timeRange === 'daily' ? '#4154c9' : 'rgba(94, 114, 228, 0.1)',
              }
            }}
          >
            Harian
          </Button>
          <Button 
            onClick={() => handleTimeRangeChange('weekly')}
            sx={{ 
              bgcolor: timeRange === 'weekly' ? '#5e72e4' : 'transparent',
              color: timeRange === 'weekly' ? 'white' : '#5e72e4',
              '&:hover': {
                bgcolor: timeRange === 'weekly' ? '#4154c9' : 'rgba(94, 114, 228, 0.1)',
              }
            }}
          >
            Mingguan
          </Button>
          <Button 
            onClick={() => handleTimeRangeChange('monthly')}
            sx={{ 
              bgcolor: timeRange === 'monthly' ? '#5e72e4' : 'transparent',
              color: timeRange === 'monthly' ? 'white' : '#5e72e4',
              '&:hover': {
                bgcolor: timeRange === 'monthly' ? '#4154c9' : 'rgba(94, 114, 228, 0.1)',
              }
            }}
          >
            Bulanan
          </Button>
        </ButtonGroup>
      </Box>
      
      <Tabs 
        value={currentTab} 
        onChange={handleTabChange}
        sx={{ 
          mb: 3,
          '& .MuiTabs-indicator': {
            backgroundColor: '#5e72e4',
          },
        }}
      >
        <Tab 
          icon={<BarChartIcon />} 
          label="Data Usage" 
          iconPosition="start"
          sx={{ 
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#5e72e4',
            },
          }}
        />
        <Tab 
          icon={<Language />} 
          label="App Usage" 
          iconPosition="start"
          sx={{ 
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#5e72e4',
            },
          }}
        />
        <Tab 
          icon={<TimelineRounded />} 
          label="Trending" 
          iconPosition="start"
          sx={{ 
            textTransform: 'none',
            '&.Mui-selected': {
              color: '#5e72e4',
            },
          }}
        />
      </Tabs>
      
      {currentTab === 0 && (
        <Box>
          <Box sx={{ textAlign: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {getChartTitle()}
            </Typography>
            <Typography variant="body1" fontWeight={600}>
              Rata-rata: {getChartData().reduce((acc, curr) => acc + curr.usage, 0).toFixed(1)} GB
            </Typography>
          </Box>
          
          <Box sx={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getChartData()}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8898aa' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8898aa' }}
                  tickFormatter={(value) => `${value} GB`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="usage" 
                  fill="#5e72e4" 
                  radius={[4, 4, 0, 0]} 
                  barSize={timeRange === 'monthly' ? 30 : 40}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      )}
      
      {currentTab === 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 280 }}>
          <Typography variant="body1" color="text.secondary">
            Informasi penggunaan aplikasi tidak tersedia
          </Typography>
        </Box>
      )}
      
      {currentTab === 2 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 280 }}>
          <Typography variant="body1" color="text.secondary">
            Informasi trending tidak tersedia
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UsageChart;