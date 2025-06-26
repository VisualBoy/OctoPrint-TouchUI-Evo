import { createTheme } from '@mui/material/styles';

// Colori proposti nel documento
const LIME_GREEN = '#32CD32'; // Esempio di verde lime, da affinare se necessario
const DARK_BACKGROUND_DEFAULT = '#33373f'; // Sfondo principale scuro
const DARK_BACKGROUND_PAPER = '#3C4049'; // Sfondo per elementi "paper" come le card, leggermente più chiaro o diverso per contrasto
// const DARK_SHADOW_LIGHT = '#3c4049'; // Ombra chiara (usata per darkMode)
// const DARK_SHADOW_DARK = '#2a2e35';  // Ombra scura (usata per darkMode)


// Creazione del tema scuro
const theme = createTheme({
  palette: {
    mode: 'dark', // Abilita il tema scuro di MUI
    primary: {
      main: LIME_GREEN, // Colore primario (verde lime)
    },
    background: {
      default: DARK_BACKGROUND_DEFAULT, // Sfondo di default per la pagina
      paper: DARK_BACKGROUND_PAPER,   // Sfondo per componenti come Card, Paper
    },
    text: {
      primary: '#FFFFFF', // Testo primario bianco per contrasto su sfondo scuro
      secondary: '#B0B0B0', // Testo secondario grigio chiaro
    },
  },
  components: {
    // Qui si potrebbero aggiungere personalizzazioni globali per componenti specifici se necessario
    // Esempio: MuiButton: { styleOverrides: { root: { textTransform: 'none' } } }
  },
});

export default theme;
