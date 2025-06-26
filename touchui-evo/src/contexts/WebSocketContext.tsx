import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Interfaccia per i dati che ci aspettiamo dal WebSocket (molto semplificata per ora)
interface OctoPrintMessage {
  type: string;
  payload: any;
}

// Interfaccia per il valore del contesto
interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: OctoPrintMessage | null;
  sendMessage: (type: string, payload?: any) => void; // Funzione per inviare messaggi
}

// Creazione del contesto con un valore di default (verrà sovrascritto dal Provider)
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

// Props per il Provider
interface WebSocketProviderProps {
  children: ReactNode;
  // Potremmo passare l'URL del WebSocket qui se necessario
  // url: string;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<OctoPrintMessage | null>(null);
  // const [socket, setSocket] = useState<WebSocket | null>(null); // Per la vera implementazione

  useEffect(() => {
    // --- SIMULAZIONE DELLA CONNESSIONE WEBSOCKET ---
    console.log('WebSocketProvider: Inizio simulazione connessione...');
    const connectTimeout = setTimeout(() => {
      setIsConnected(true);
      // setSocket(new WebSocket(url)); // Vera connessione
      console.log('WebSocketProvider: Simulazione connessione riuscita.');

      // Simula la ricezione di un messaggio dopo la connessione
      const messageTimeout = setTimeout(() => {
        const mockMessage: OctoPrintMessage = {
          type: 'current',
          payload: {
            temps: [{ tool0: { actual: 210, target: 210 }, bed: { actual: 60, target: 60 } }],
            state: { text: 'Operational', flags: { operational: true } },
          },
        };
        setLastMessage(mockMessage);
        console.log('WebSocketProvider: Simulazione messaggio ricevuto:', mockMessage);
      }, 2000);
      return () => clearTimeout(messageTimeout);
    }, 1000);

    // Cleanup della simulazione
    return () => {
      clearTimeout(connectTimeout);
      setIsConnected(false);
      // if (socket) socket.close(); // Vera disconnessione
      console.log('WebSocketProvider: Simulazione disconnessa.');
    };
    // }, [url]); // Dipendenza per la vera implementazione
  }, []); // Array vuoto per eseguire solo al mount/unmount per ora

  const sendMessage = (type: string, payload?: any) => {
    // if (socket && socket.readyState === WebSocket.OPEN) {
    //   const message = JSON.stringify({ type, payload });
    //   socket.send(message);
    //   console.log('WebSocketProvider: Messaggio inviato:', { type, payload });
    // } else {
    //   console.error('WebSocketProvider: Socket non connesso o non pronto.');
    // }
    // --- SIMULAZIONE INVIO MESSAGGIO ---
    console.log('WebSocketProvider: Simulazione invio messaggio:', { type, payload });
    // Potremmo simulare una risposta qui se necessario
    setLastMessage({ type: "command_sent", payload: {command: type, data: payload} });
  };

  const contextValue: WebSocketContextType = {
    isConnected,
    lastMessage,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Hook personalizzato per usare il contesto WebSocket
export const useOctoPrintSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useOctoPrintSocket must be used within a WebSocketProvider');
  }
  return context;
};
