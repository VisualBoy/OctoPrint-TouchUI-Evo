import { Button, Paper, styled, Theme } from '@mui/material';
import { ButtonProps } from '@mui/material/Button';

interface NeumorphicCardProps {
  theme?: Theme;
}

export const NeumorphicCard = styled(Paper)<NeumorphicCardProps>(({ theme }) => ({
  borderRadius: 15,
  backgroundColor: theme.palette.custom.cardBackground,
  backdropFilter: 'blur(12px)',
  border: `1px solid ${theme.palette.custom.componentBorder}`,
  boxShadow: theme.palette.custom.glowShadow,
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

interface NeumorphicButtonProps extends ButtonProps {
  theme?: Theme;
}

export const NeumorphicButton = styled(Button)<NeumorphicButtonProps>(({ theme }) => ({
  borderRadius: 10,
  backgroundColor: theme.palette.custom.buttonBackground,
  color: theme.palette.text.primary,
  boxShadow: theme.palette.custom.buttonGlowShadow,
  border: `1px solid ${theme.palette.custom.componentBorder}`,
  transition: theme.transitions.create(
    ['transform', 'box-shadow', 'background-color', 'border-color'],
    {
      duration: theme.transitions.duration.short,
    }
  ),
  textTransform: 'none',
  fontWeight: 'bold',
  padding: theme.spacing(0.75, 2),
  '&:hover': {
    backgroundColor: theme.palette.custom.buttonHoverBackground,
    color: theme.palette.text.primary,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 25px 0 rgba(${theme.palette.custom.limeGlowColor}, 0.5)`,
    borderColor: `rgba(${theme.palette.custom.limeGlowColor}, 0.7)`,
  },
  '&:active': {
    backgroundColor: theme.palette.custom.buttonActiveBackground,
    color: theme.palette.text.primary,
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 20px 0 rgba(${theme.palette.custom.limeGlowColor}, 0.4)`,
    borderColor: `rgba(${theme.palette.custom.limeGlowColor}, 0.9)`,
  },
  '&.Mui-disabled': {
    opacity: 0.4,
    backgroundColor: 'rgba(50, 52, 64, 0.4)', // Keeping this direct for now, can be themed later if needed
    color: theme.palette.text.disabled,
    boxShadow: 'none',
    transform: 'none',
    borderColor: 'rgba(255, 255, 255, 0.05)', // Keeping this direct for now
  },
}));
