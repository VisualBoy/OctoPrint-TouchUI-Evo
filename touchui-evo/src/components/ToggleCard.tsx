import React from 'react';
import { Box, Typography, Switch, useTheme, SxProps, Theme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TouchUiCard, TouchUiCardProps } from '../TouchUiCard'; // Assuming TouchUiCard is at this path

// Custom styled Switch for Neumorphic/Glassmorphism look if needed
// For now, we'll use the standard MUI Switch and assume it's themed globally or via props.
// Theming for Switch can be quite detailed.
const StyledSwitch = styled(Switch)(({ theme }) => ({
  // Example: Customizing the switch track and thumb
  // padding: 8,
  // '& .MuiSwitch-track': {
  //   borderRadius: 22 / 2,
  //   backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
  //   opacity: 1,
  //   transition: theme.transitions.create(['background-color'], {
  //     duration: 500,
  //   }),
  // },
  // '& .MuiSwitch-thumb': {
  //   boxShadow: 'none',
  //   backgroundColor: theme.palette.common.white,
  //   width: 16,
  //   height: 16,
  //   margin: 2,
  // },
  // '& .Mui-checked': {
  //   transform: 'translateX(16px)', // Adjust based on switch size
  //   '& + .MuiSwitch-track': {
  //     backgroundColor: theme.palette.primary.main,
  //     opacity: 1,
  //   },
  //   '& .MuiSwitch-thumb': {
  //     backgroundColor: theme.palette.common.white,
  //   }
  // },
}));

interface ToggleCardProps extends Omit<TouchUiCardProps, 'children' | 'onClick'> {
  icon?: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  iconSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
}

const ToggleCard: React.FC<ToggleCardProps> = ({
  icon,
  label,
  checked,
  onChange,
  disabled = false,
  sx,
  iconSx,
  labelSx,
  ...touchUiCardProps
}) => {
  const theme = useTheme();

  return (
    <TouchUiCard
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing(1.5, 2), // Consistent padding
        cursor: disabled ? 'default' : 'pointer',
        ...sx,
      }}
      onClick={!disabled ? (e) => onChange(e as any, !checked) : undefined} // Allow clicking card to toggle
      {...touchUiCardProps}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, marginRight: 2 }}>
        {icon && (
          <Box
            component="div"
            sx={{
              marginRight: 1.5,
              color: checked ? theme.palette.primary.main : theme.palette.text.secondary,
              display: 'flex',
              alignItems: 'center',
              ...iconSx,
            }}
          >
            {icon}
          </Box>
        )}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: checked ? theme.palette.text.primary : theme.palette.text.secondary,
            userSelect: 'none',
            ...labelSx,
          }}
        >
          {label}
        </Typography>
      </Box>
      <StyledSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        onClick={(e) => e.stopPropagation()} // Prevent card click handler from firing twice
      />
    </TouchUiCard>
  );
};

export default ToggleCard;
