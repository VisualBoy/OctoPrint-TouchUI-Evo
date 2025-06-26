import { Button, styled, Theme } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

interface TouchUiButtonProps extends ButtonProps {
  theme?: Theme;
}

// Updated to Glassmorphism style using theme variables
export const TouchUiButton = styled(Button)<TouchUiButtonProps>(({ theme }) => ({
  borderRadius: 10,
  padding: theme.spacing(0.75, 2),
  fontWeight: 'bold',
  textTransform: 'none',
  backgroundColor: theme.palette.custom.buttonBackground,
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.custom.componentBorder}`,
  boxShadow: theme.palette.custom.buttonGlowShadow,
  transition: theme.transitions.create(
    ['transform', 'box-shadow', 'background-color', 'border-color', 'color'],
    {
      duration: theme.transitions.duration.short,
    }
  ),
  '&:hover': {
    backgroundColor: theme.palette.custom.buttonHoverBackground,
    color: theme.palette.text.primary,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 25px 0 rgba(${theme.palette.custom.limeGlowColor}, 0.5)`,
    borderColor: `rgba(${theme.palette.custom.limeGlowColor}, 0.7)`,
  },
  '&:active': {
    backgroundColor: theme.palette.custom.buttonActiveBackground,
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 20px 0 rgba(${theme.palette.custom.limeGlowColor}, 0.4)`,
    borderColor: `rgba(${theme.palette.custom.limeGlowColor}, 0.9)`,
  },
  '&.Mui-disabled': {
    opacity: 0.4,
    backgroundColor: theme.palette.custom.buttonBackground && theme.palette.custom.buttonBackground.replace(/,\s*0\.\d+\)/, ', 0.4)'), // Make bg more transparent
    color: theme.palette.text.disabled,
    boxShadow: 'none',
    transform: 'none',
    borderColor: theme.palette.custom.componentBorder && theme.palette.custom.componentBorder.replace(/,\s*0\.\d+\)/, ', 0.05)'), // Make border more transparent
  },
}));
