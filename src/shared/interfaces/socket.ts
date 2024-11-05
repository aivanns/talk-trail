import { SocketChatService } from "../utils/socket-io/socketChatService";

export interface SocketContextType {
    socket: SocketChatService | null;
}