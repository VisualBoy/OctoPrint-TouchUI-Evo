import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts';
import { TouchUiCard } from './TouchUiCard';

interface DataPoint {
  time: string | number; // Can be timestamp or formatted string
  value: number;
}

interface LineChartCardProps {
  title: string;
  data: DataPoint[];
  color?: string; // Optional: to customize line/area color
  height?: number | string;
}

export const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  data,
  color,
  height = 300,
}) => {
  const theme = useTheme();
  const chartColor = color || theme.palette.primary.main;

  return (
    <TouchUiCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%', height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, left: -25, bottom: 5 }}>
            <defs>
              <linearGradient id={`colorGradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.5} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.text.secondary} strokeOpacity={0.2} />
            <XAxis
              dataKey="time"
              stroke={theme.palette.text.secondary}
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: theme.palette.text.secondary, strokeOpacity: 0.5 }}
              tickLine={{ stroke: theme.palette.text.secondary, strokeOpacity: 0.5 }}
            />
            <YAxis
              stroke={theme.palette.text.secondary}
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: theme.palette.text.secondary, strokeOpacity: 0.5 }}
              tickLine={{ stroke: theme.palette.text.secondary, strokeOpacity: 0.5 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.custom.componentBorder,
                borderRadius: '10px',
                boxShadow: theme.shadows[3],
              }}
              itemStyle={{ color: theme.palette.text.primary }}
              labelStyle={{ color: theme.palette.primary.main, fontWeight: 'bold' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#colorGradient-${title.replace(/\s+/g, '-')})`}
              activeDot={{ r: 6, stroke: theme.palette.background.paper, strokeWidth: 2 }}
              animationDuration={300}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </TouchUiCard>
  );
};

// Example Usage (can be removed or moved to a storybook/demo file later):
/*
const SampleTemperatureData: DataPoint[] = [
  { time: '10:00', value: 200 },
  { time: '10:05', value: 205 },
  { time: '10:10', value: 210 },
  { time: '10:15', value: 208 },
  { time: '10:20', value: 212 },
  { time: '10:25', value: 215 },
  { time: '10:30', value: 213 },
];

export const SampleLineChartCard = () => (
  <Box sx={{ width: '100%', maxWidth: 500, p: 2 }}>
    <LineChartCard title="Tool Temperature" data={SampleTemperatureData} />
  </Box>
);
*/
export default LineChartCard;
