import { Button, Paper, styled, Theme } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

// Original comments about neumorphic values and shadows are removed as we shift to glassmorphism.

interface TouchUiCardProps {
  theme?: Theme;
}

// Updated to Glassmorphism style using theme variables
export const TouchUiCard = styled(Paper)<TouchUiCardProps>(({ theme }) => ({
  borderRadius: 15,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.custom.cardBackground,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.custom.componentBorder}`,
  boxShadow: theme.palette.custom.glowShadow,
  color: theme.palette.text.primary,
}));

// NeumorphicButton has been moved to TouchUiButton.tsx
// The hexToRgb helper function has been moved to theme.ts.
// Old comments about neumorphism have been removed.
