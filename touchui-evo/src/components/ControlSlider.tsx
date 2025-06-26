import React from 'react';
import { Box, Typography, Slider, Grid, useTheme, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom styled Slider for Neumorphic/Glassmorphism look if needed,
// or rely on global MUI Slider theme overrides.
// For now, we'll use the standard MUI Slider and assume it's themed globally.
const StyledSlider = styled(Slider)(({ theme }) => ({
  // Example of custom styling for the slider track and thumb to match the glass/neumorphic theme
  // This can be expanded based on specific design requirements.
  // color: theme.palette.primary.main, // Already default
  // '& .MuiSlider-thumb': {
  //   backgroundColor: theme.palette.primary.main,
  //   border: `2px solid ${theme.palette.common.white}`,
  //   '&:hover, &.Mui-focusVisible': {
  //     boxShadow: `0 0 0 8px ${theme.palette.primary.main}33`, // Faint glow
  //   },
  //   '&.Mui-active': {
  //     boxShadow: `0 0 0 14px ${theme.palette.primary.main}55`, // Stronger glow when active
  //   },
  // },
  // '& .MuiSlider-track': {
  //   height: 6,
  // },
  // '& .MuiSlider-rail': {
  //   height: 6,
  //   backgroundColor: theme.palette.custom?.componentBorder || theme.palette.grey[700],
  // },
}));

interface ControlSliderProps {
  icon?: React.ReactNode;
  label: string;
  value: number;
  onChange: (event: Event, newValue: number | number[]) => void;
  onChangeCommitted?: (event: React.SyntheticEvent | Event, newValue: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  valueSx?: SxProps<Theme>;
}

const ControlSlider: React.FC<ControlSliderProps> = ({
  icon,
  label,
  value,
  onChange,
  onChangeCommitted,
  min = 0,
  max = 100,
  step = 1,
  unit = '%',
  disabled = false,
  sx,
  iconSx,
  labelSx,
  valueSx,
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ padding: theme.spacing(1.5, 2), ...sx }}>
      <Grid container spacing={2} alignItems="center">
        {icon && (
          <Grid item sx={{ color: theme.palette.text.secondary, ...iconSx }}>
            {icon}
          </Grid>
        )}
        <Grid item xs>
          <Typography
            variant="body2"
            id={`control-slider-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
            gutterBottom
            sx={{ color: theme.palette.text.secondary, userSelect: 'none', ...labelSx }}
          >
            {label}
          </Typography>
          <StyledSlider
            value={value}
            onChange={onChange}
            onChangeCommitted={onChangeCommitted}
            aria-labelledby={`control-slider-label-${label.toLowerCase().replace(/\s+/g, '-')}`}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            valueLabelDisplay="auto" // Consider if value label on thumb is desired
          />
        </Grid>
        <Grid item sx={{ minWidth: '50px', textAlign: 'right' }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', color: theme.palette.primary.main, userSelect: 'none', ...valueSx }}
          >
            {value.toFixed(step && step < 1 ? 1 : 0)}{unit}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ControlSlider;
