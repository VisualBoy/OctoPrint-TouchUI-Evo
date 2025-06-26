import { createTheme, PaletteOptions, Palette } from '@mui/material/styles'; // Added PaletteOptions and Palette

// Helper function to convert hex to rgb components
const hexToRgb = (hex: string): string => {
  let r = '0', g = '0', b = '0';
  if (hex.length === 4) { // #RGB format
    r = "0x" + hex[1] + hex[1];
    g = "0x" + hex[2] + hex[2];
    b = "0x" + hex[3] + hex[3];
  } else if (hex.length === 7) { // #RRGGBB format
    r = "0x" + hex[1] + hex[2];
    g = "0x" + hex[3] + hex[4];
    b = "0x" + hex[5] + hex[6];
  }
  return `${+r},${+g},${+b}`;
};

// Colors proposed in the document
const LIME_GREEN = '#32CD32'; // Example of lime green, to be refined if necessary
const DARK_BACKGROUND_DEFAULT = '#33373f'; // Main dark background
const DARK_BACKGROUND_PAPER = '#3C4049'; // Background for "paper" elements like cards, slightly lighter or different for contrast
// const DARK_SHADOW_LIGHT = '#3c4049'; // Light shadow (used for darkMode) - Not currently used by glass components
// const DARK_SHADOW_DARK = '#2a2e35';  // Dark shadow (used for darkMode) - Not currently used by glass components

// Custom Palette Extensions for Glass UI and other additions
declare module '@mui/material/styles/createPalette' {
  interface CustomPaletteOptions {
    cardBackground?: string;
    buttonBackground?: string;
    componentBorder?: string;
    glowShadow?: string;
    buttonGlowShadow?: string;
    buttonHoverBackground?: string;
    buttonActiveBackground?: string;
    limeGlowColor?: string;
    // Status colors (will be used by StatusIndicatorLight later)
    statusSuccess?: string;
    statusWarning?: string;
    statusError?: string;
    statusNeutral?: string;
    statusConnecting?: string;
  }

  interface PaletteOptions {
    custom?: CustomPaletteOptions;
  }

  interface Palette {
    custom: CustomPaletteOptions; // Make non-optional in Palette
  }
}
// Dark theme creation
const theme = createTheme({
  palette: {
    mode: 'dark', // Enables MUI dark theme
    primary: {
      main: LIME_GREEN, // Primary color (lime green)
    },
    background: {
      default: DARK_BACKGROUND_DEFAULT, // Default background for the page
      paper: DARK_BACKGROUND_PAPER,   // Background for components like Card, Paper (traditional MUI paper)
    },
    text: {
      primary: '#FFFFFF', // Primary white text for contrast on dark background
      secondary: '#B0B0B0', // Secondary light gray text
    },
    // MUI's standard success, warning, error, info colors can be used if suitable
    success: {
      main: '#4caf50', // Standard MUI green
    },
    warning: {
      main: '#ff9800', // Standard MUI orange
    },
    error: {
      main: '#f44336',   // Standard MUI red
    },
    info: {
      main: '#2196f3',   // Standard MUI blue
    },
    custom: { // Custom colors for the "Glass" theme components and specific indicators
      cardBackground: 'rgba(40, 42, 54, 0.5)',
      buttonBackground: 'rgba(50, 52, 64, 0.6)',
      componentBorder: 'rgba(255, 255, 255, 0.1)',
      glowShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)', // Main glass card shadow
      buttonGlowShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.3)', // Glass button shadow
      buttonHoverBackground: 'rgba(60, 62, 74, 0.75)',
      buttonActiveBackground: 'rgba(70, 72, 84, 0.8)',
      limeGlowColor: hexToRgb(LIME_GREEN), // RGB components of LIME_GREEN for rgba() accents
      // Status colors for StatusIndicatorLight
      statusSuccess: '#66bb6a', // A slightly brighter green for status
      statusWarning: '#ffa726', // A slightly brighter orange for status
      statusError: '#ef5350',   // A slightly brighter red for status
      statusNeutral: '#757575', // Mid-grey for status
      statusConnecting: '#29b6f6', // A slightly brighter blue for pulsing status
    },
  },
  components: {
    // Global customizations for specific components could be added here
    // Example: MuiButton: { styleOverrides: { root: { textTransform: 'none' } } }
  },
});

export default theme;
