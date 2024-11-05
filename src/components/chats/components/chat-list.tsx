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
        const filteredChats = data.filter((chat: Chat) => {
            return chat.messages.length > 0 || chat.uuid === uuid;
        });
        setChats(filteredChats);
    };

    useEffect(() => {
        loadChats();
    }, [uuid]);

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
    }, [socket, uuid]);

    return (
        <div className="flex flex-col items-start h-full overflow-y-auto scrollbar-hide">
            {chats.map((chat: Chat) => (
                <ChatEntity 
                    key={chat.uuid} 
                    chat={chat} 
                    isActive={chat.uuid === uuid}
                />
            ))}
        </div>
    );
};

export default ChatList;