// @ts-nocheck
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import './styles/Chart.css';

interface ChartDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartProps {
  data: ChartDataPoint[];
  isDarkMode: boolean;
}

const Chart: React.FC<ChartProps> = ({ data, isDarkMode }) => {
  // If no data provided, show placeholder
  if (!data || data.length === 0) {
    return (
      <div 
        style={{ 
          height: '100px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: isDarkMode ? '#b3b3b3' : '#666666',
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5',
          borderRadius: '4px'
        }}
      >
        No chart data available
      </div>
    );
  }

  // Create a simple line chart representation
  const maxValue = Math.max(...data.map(d => d.high));
  const minValue = Math.min(...data.map(d => d.low));
  const range = maxValue - minValue;
  
  const chartHeight = 100;
  const chartWidth = 200;
  
  // Calculate points for SVG path
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((point.close - minValue) / range) * chartHeight;
    return `${x},${y}`;
  }).join(' ');

  const lastPoint = data[data.length - 1];
  const isPositive = lastPoint.close >= data[0].close;
  const lineColor = isPositive ? '#4caf50' : '#f44336';

  return (
    <div style={{ height: '100px', width: '100%', padding: '5px 0' }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Chart; 