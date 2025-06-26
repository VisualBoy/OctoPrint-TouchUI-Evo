import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { WebSocketProvider } from './contexts/WebSocketContext';
import { NotificationProvider } from './contexts/NotificationContext'; // Import NotificationProvider
import Layout from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Typography, Box } from '@mui/material';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'temperature':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Controllo Temperature
            </Typography>
            <Typography>
              Pagina dedicata al controllo dettagliato delle temperature (in sviluppo)
            </Typography>
          </Box>
        );
      case 'controls':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Controlli Stampante
            </Typography>
            <Typography>
              Pagina per i controlli avanzati della stampante (in sviluppo)
            </Typography>
          </Box>
        );
      case 'gcode':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Visualizzatore G-Code
            </Typography>
            <Typography>
              Visualizzatore 3D del G-Code (in sviluppo)
            </Typography>
          </Box>
        );
      case 'terminal':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Terminale
            </Typography>
            <Typography>
              Terminale per comunicazione diretta con la stampante (in sviluppo)
            </Typography>
          </Box>
        );
      case 'settings':
        return (
          <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              Impostazioni
            </Typography>
            <Typography>
              Configurazione dell'interfaccia TouchUI (in sviluppo)
            </Typography>
          </Box>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <WebSocketProvider>
        <NotificationProvider> {/* Ensure NotificationProvider wraps Layout */}
          <CssBaseline /> {/* CssBaseline can be here or inside Layout if preferred */}
          <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
            {renderPage()}
          </Layout>
        </NotificationProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
}

export default App;