import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { WebSocketProvider } from './contexts/WebSocketContext';
import Layout from './components/Layout'; // Importa il componente Layout
import { Typography } from '@mui/material'; // Per un piccolo test del WebSocket
import { useOctoPrintSocket } from './contexts/WebSocketContext'; // Per testare il socket

// Componente di test per il WebSocket
const WebSocketStatusDisplay: React.FC = () => {
  const { isConnected, lastMessage } = useOctoPrintSocket();
  return (
    <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#444' }}>
      <Typography variant="caption">
        Stato WebSocket: {isConnected ? 'Connesso (Simulato)' : 'Disconnesso (Simulato)'}
      </Typography>
      <br />
      <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        Ultimo Messaggio (Simulato): {lastMessage ? JSON.stringify(lastMessage) : 'Nessuno'}
      </Typography>
    </div>
  );
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <WebSocketProvider>
        <CssBaseline />
        <Layout>
          {/* Il contenuto che vuoi visualizzare all'interno del layout va qui */}
          <Typography variant="h4" gutterBottom>
            Benvenuti in TouchUI Remake!
          </Typography>
          <Typography paragraph>
            Questa è l'area contenuti principale. Il layout include una AppBar e un Drawer laterale.
            Sotto, un piccolo display per lo stato (simulato) del WebSocket.
          </Typography>
          <WebSocketStatusDisplay />
          {/*
            L'header di esempio che c'era prima è stato rimosso
            perché ora il Layout gestisce l'AppBar.
            I componenti Neumorfici di esempio sono già inclusi in fondo al Layout.tsx stesso.
           */}
        </Layout>
      </WebSocketProvider>
    </ThemeProvider>
  );
}

export default App;
