import React from 'react';
import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material';
import { TouchUiCard, TouchUiCardProps } from '../TouchUiCard'; // Assuming TouchUiCardProps are exported

interface DataCardProps extends Omit<TouchUiCardProps, 'children'> {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  variant?: 'normal' | 'highlight';
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  valueSx?: SxProps<Theme>;
}

const DataCard: React.FC<DataCardProps> = ({
  icon,
  label,
  value,
  variant = 'normal',
  sx,
  iconSx,
  labelSx,
  valueSx,
  ...touchUiCardProps
}) => {
  const theme = useTheme();
  const highlightColor = theme.palette.primary.main;

  return (
    <TouchUiCard
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: theme.spacing(2),
        minHeight: '120px', // Ensure a consistent minimum size
        ...sx,
      }}
      {...touchUiCardProps}
    >
      {icon && (
        <Box
          component="div"
          sx={{
            marginBottom: 1,
            color: variant === 'highlight' ? highlightColor : theme.palette.text.secondary,
            fontSize: '2rem', // Default icon size
            ...iconSx,
          }}
        >
          {icon}
        </Box>
      )}
      <Typography
        variant="caption"
        component="div"
        sx={{
          color: theme.palette.text.secondary,
          marginBottom: 0.5,
          ...labelSx,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: 'bold',
          color: variant === 'highlight' ? highlightColor : theme.palette.text.primary,
          ...valueSx,
        }}
      >
        {value}
      </Typography>
    </TouchUiCard>
  );
};

export default DataCard;
