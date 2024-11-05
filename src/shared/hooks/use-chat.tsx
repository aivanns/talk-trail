import { useEffect, useRef } from 'react';
import { SocketChatService } from '../utils/socket-io/socketChatService';

export const useChat = (serverUrl: string) => {
    const socketRef = useRef<SocketChatService | null>(null);

    useEffect(() => {
        
        socketRef.current = new SocketChatService(serverUrl);

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [serverUrl]);

    const sendMessage = (message: any) => {
        socketRef.current?.sendMessage(message);
    };

    return { sendMessage };
};