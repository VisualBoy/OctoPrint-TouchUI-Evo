import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, TextField, IconButton, useTheme, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
// import { AttachAddon } from '@xterm/addon-attach'; // We'll use manual message handling
import '@xterm/xterm/css/xterm.css';
import { TouchUiCard } from '../TouchUiCard';
// import { useOctoPrintSocket } from '../../contexts/WebSocketContext';

// Mock for now
const mockUseOctoPrintSocket = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const sendMessage = (message: any) => {
    console.log('Mock sendMessage (Terminal):', message);
    // Simulate command echo
    if (message.command) {
      setLog(prev => [...prev, `> ${message.command}`]);
    }
    // Simulate a response
    setTimeout(() => setLog(prev => [...prev, `ok`]), 500);

  };

  // Simulate receiving logs from WebSocket
  useEffect(() => {
    const initialLogs = [
      "Connecting to printer...",
      "Printer is now operational.",
      "Firmware: Marlin XYZ v1.2.3",
      "Bed Target: 0.0  Actual: 22.5",
      "Tool0 Target: 0.0  Actual: 23.1",
    ];
    setHistory(initialLogs); // History is usually prepended, logs are appended

    const interval = setInterval(() => {
        // const randomLog = `Random Log: ${Math.random().toString(36).substring(7)} at ${new Date().toLocaleTimeString()}`;
        // setLog(prev => [...prev, randomLog]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return { history, log, sendMessage };
};


export const TerminalPanelWidget: React.FC = () => {
  const theme = useTheme();
  const { history, log, sendMessage } = mockUseOctoPrintSocket();
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const [inputCommand, setInputCommand] = useState('');

  const handleSendCommand = () => {
    if (inputCommand.trim()) {
      sendMessage({ command: inputCommand.trim() });
      // xtermRef.current?.writeln(`> ${inputCommand.trim()}`); // Echo command locally
      setInputCommand('');
    }
  };

  const initializeTerminal = useCallback(() => {
    if (terminalRef.current && !xtermRef.current) {
      const term = new Terminal({
        cursorBlink: true,
        convertEol: true,
        rows: 15, // Initial rows, FitAddon will adjust
        theme: {
          background: theme.palette.custom.cardBackground || '#2B2B2B', // Dark background
          foreground: theme.palette.text.primary || '#F0F0F0',
          cursor: theme.palette.primary.main || '#32CD32',
          selectionBackground: theme.palette.primary.dark || '#2A8A2A',
          black: '#2e3436',
          red: '#cc0000',
          green: '#4e9a06',
          yellow: '#c4a000',
          blue: '#3465a4',
          magenta: '#75507b',
          cyan: '#06989a',
          white: '#d3d7cf',
          brightBlack: '#555753',
          brightRed: '#ef2929',
          brightGreen: '#8ae234',
          brightYellow: '#fce94f',
          brightBlue: '#729fcf',
          brightMagenta: '#ad7fa8',
          brightCyan: '#34e2e2',
          brightWhite: '#eeeeec',
        },
        fontSize: 13,
        fontFamily: 'Source Code Pro, monospace',
        allowProposedApi: true, // Required for some addons or future features
      });

      const fitAddon = new FitAddon();
      fitAddonRef.current = fitAddon;
      term.loadAddon(fitAddon);

      term.open(terminalRef.current);
      fitAddon.fit();

      xtermRef.current = term;

      // Load history
      history.forEach(line => term.writeln(line));
    }
  }, [theme, history]);

  useEffect(() => {
    initializeTerminal();
  }, [initializeTerminal]);

  useEffect(() => {
    // Write new log lines as they come in
    if (xtermRef.current && log.length > 0) {
      log.forEach(line => xtermRef.current?.writeln(line));
      // Clear the log buffer in state after writing to terminal to avoid re-writing
      // This depends on how `log` is managed in the actual WebSocket context
    }
  }, [log]);


  useEffect(() => {
    const handleResize = () => {
      fitAddonRef.current?.fit();
    };
    window.addEventListener('resize', handleResize);
    // Also try to fit when the card itself might resize (e.g. dashboard layout change)
    // This might need a ResizeObserver on terminalRef.current or its parent
    const resizeObserver = new ResizeObserver(handleResize);
    if (terminalRef.current) {
        resizeObserver.observe(terminalRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (terminalRef.current) {
        resizeObserver.unobserve(terminalRef.current);
      }
      // xtermRef.current?.dispose(); // Dispose on unmount
      // xtermRef.current = null;
    };
  }, []);

    // Clean up terminal on component unmount
  useEffect(() => {
    return () => {
      xtermRef.current?.dispose();
      xtermRef.current = null;
    };
  }, []);


  return (
    <TouchUiCard sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" component="div" sx={{ mb: 1, textAlign: 'center', color: theme.palette.primary.main }}>
        Terminal
      </Typography>
      <Paper
        ref={terminalRef}
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.custom.cardBackground, // Consistent background
          padding: theme.spacing(1),
          overflow: 'hidden', // Important for xterm
          minHeight: '200px', // Ensure it has some minimum height
          border: `1px solid ${theme.palette.custom.componentBorder}`,
          borderRadius: '8px',
          '& .xterm .xterm-viewport': { // Ensure viewport scrolls within this paper
            overflowY: 'auto',
            backgroundColor: 'transparent', // xterm viewport bg should be transparent
          },
          '& .xterm .xterm-screen': {
             backgroundColor: 'transparent', // xterm screen bg should be transparent
          }
        }}
      />
      <Box sx={{ display: 'flex', mt: 1 }}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Send G-code command..."
          value={inputCommand}
          onChange={(e) => setInputCommand(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendCommand();
            }
          }}
          sx={{
            mr: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.custom.buttonBackground, // Glassy input
              backdropFilter: 'blur(5px)',
              borderColor: theme.palette.custom.componentBorder,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.light,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
              },
            },
            input: { color: theme.palette.text.primary }
          }}
        />
        <IconButton
            color="primary"
            onClick={handleSendCommand}
            sx={{
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                '&:hover': {backgroundColor: theme.palette.primary.dark}
            }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </TouchUiCard>
  );
};

export default TerminalPanelWidget;
