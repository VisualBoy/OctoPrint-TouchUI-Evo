import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface CircularGaugeProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  unit?: string;
  valueFontSize?: string | number;
  labelFontSize?: string | number;
}

const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  minValue = 0,
  maxValue = 100,
  size = 200,
  strokeWidth = 16,
  label,
  unit = '',
  valueFontSize = '2.5rem',
  labelFontSize = '1rem',
}) => {
  const theme = useTheme();
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI; // Semi-circle

  const percentage = Math.max(0, Math.min(100, ((value - minValue) / (maxValue - minValue)) * 100));
  const offset = circumference - (percentage / 100) * circumference;

  const viewBox = `0 0 ${size} ${size / 2 + strokeWidth / 2}`;

  const primaryColor = theme.palette.primary.main;
  const trackColor = theme.palette.custom?.componentBorder || theme.palette.grey[700];
  const textColor = theme.palette.text.primary;

  return (
    <Box
      sx={{
        width: size,
        height: size / 2 + strokeWidth / 2 + 40, // Adjusted for text below
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align SVG to top
      }}
    >
      <svg
        width={size}
        height={size / 2 + strokeWidth / 2}
        viewBox={viewBox}
        style={{ transform: 'rotateX(180deg) rotateZ(180deg)', overflow: 'visible' }}
      >
        <path
          d={`M ${strokeWidth / 2} ${size / 2}
              A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2} ${size / 2}
              A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.3s ease' }}
        />
      </svg>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0, // Position text at the very bottom of the main Box
          width: '100%',
          textAlign: 'center',
          color: textColor,
        }}
      >
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: valueFontSize,
            lineHeight: 1.1,
            color: primaryColor, // Make value color primary
          }}
        >
          {value.toFixed(1)}{unit}
        </Typography>
        {label && (
          <Typography
            variant="caption"
            component="div"
            sx={{
              fontSize: labelFontSize,
              color: theme.palette.text.secondary,
              marginTop: '4px',
            }}
          >
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CircularGauge;
