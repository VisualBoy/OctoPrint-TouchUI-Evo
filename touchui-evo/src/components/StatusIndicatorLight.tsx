import React from 'react';
import { Box, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

export type StatusType = 'success' | 'warning' | 'error' | 'neutral' | 'connecting';

interface StatusIndicatorLightProps {
  status: StatusType;
  shape?: 'circle' | 'pill';
  pulsing?: boolean;
  size?: number; // For circle: diameter; for pill: height
}

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StatusIndicatorLight: React.FC<StatusIndicatorLightProps> = ({
  status,
  shape = 'circle',
  pulsing = false,
  size = 12,
}) => {
  const theme = useTheme();

  const statusColors: Record<StatusType, string | undefined> = {
    success: theme.palette.custom?.statusSuccess,
    warning: theme.palette.custom?.statusWarning,
    error: theme.palette.custom?.statusError,
    neutral: theme.palette.custom?.statusNeutral,
    connecting: theme.palette.custom?.statusConnecting,
  };

  const backgroundColor = statusColors[status] || theme.palette.custom?.statusNeutral || theme.palette.grey[500];

  const baseStyles = {
    width: shape === 'pill' ? size * 2.5 : size,
    height: size,
    backgroundColor,
    borderRadius: shape === 'pill' ? size / 2 : '50%',
    display: 'inline-block',
    transition: 'background-color 0.3s ease',
  };

  const pulsingStyles = pulsing
    ? {
        animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
        boxShadow: `0 0 ${size / 2}px ${backgroundColor}`, // Add a glow effect when pulsing
      }
    : {};

  return <Box sx={{ ...baseStyles, ...pulsingStyles }} />;
};

export default StatusIndicatorLight;
