import { useEffect, useState } from "react";
import { getChats } from "../../../shared/utils/services/chatService";
import { Chat } from "../../../types/chat";
import { Chats } from "../../../types/chat";
import ChatEntity from "./chat-entity";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../shared/contexts/SocketContext";

const ChatList = () => {
    const [chats, setChats] = useState<Chats>([]);
    const { uuid } = useParams();
    const { socket } = useSocket();
    
    const loadChats = async () => {
        const data = await getChats();
        setChats(data);
    };

    useEffect(() => {
        loadChats();
    }, []);

    useEffect(() => {
        if (socket) {
            const handleNewMessage = () => {
                loadChats();
            };

            socket.onMessage(handleNewMessage);
            return () => {
                socket.offMessage(handleNewMessage);
            };
        }
    }, [socket]);
    
    return (
        <div>
            {chats.map((chat: Chat) => (
                <ChatEntity 
                    key={chat.uuid} 
                    chat={chat}
                    isActive={chat.uuid === uuid}
                />
            ))}
        </div>
    );
}

export default ChatList;