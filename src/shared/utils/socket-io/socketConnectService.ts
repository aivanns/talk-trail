import { getToken } from "../services/tokenService";
import { SocketChatService } from "./socketChatService";

export const socketConnect = (socket: SocketChatService | null) => {
    if (socket) {
        const token = getToken();
        socket.connect(token);
    }
    
    return () => {
        if (socket) {
            socket.disconnect();
        }
    };
}