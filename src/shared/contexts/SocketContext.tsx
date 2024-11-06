import { createContext, useEffect, useState } from 'react';
import { SocketChatService } from '../utils/socket-io/socketChatService';
import { SocketContextType } from '../interfaces/socket';

export const SocketContext = createContext<SocketContextType>({ socket: null });

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<SocketChatService | null>(null);

  useEffect(() => {
    const socketService = new SocketChatService(import.meta.env.VITE_SOCKET_URL);
    setSocket(socketService);

    return () => {
      if (socketService) {
        socketService.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}; 