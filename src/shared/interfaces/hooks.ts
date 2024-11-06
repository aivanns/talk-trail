import { SocketChatService } from "../utils/socket-io/socketChatService";

export interface ModalContextType {
    openModal: () => void;
}

export interface SocketContextType {
    socket: SocketChatService | null;
}