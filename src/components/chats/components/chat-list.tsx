import { useEffect, useState } from "react";
import { getChats } from "../../../shared/utils/services/chatService";
import { Chat } from "../../../types/chat";
import { Chats } from "../../../types/chat";
import ChatEntity from "./chat-entity";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../shared/contexts/SocketContext";

const ChatList = () => {
    const [chats, setChats] = useState<Chats>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { uuid } = useParams();
    const { socket } = useSocket();
    
    const loadChats = async () => {
        setIsLoading(true);
        try {
            const data = await getChats();
            const filteredChats = data
                .filter((chat: Chat) => {
                    return chat.messages.length > 0 || chat.uuid === uuid;
                })
                .sort((a: Chat, b: Chat) => {
                    const lastMessageA = a.messages[a.messages.length - 1];
                    const lastMessageB = b.messages[b.messages.length - 1];
                    
                    if (!lastMessageA) return 1;
                    if (!lastMessageB) return -1;
                    
                    return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime();
                });
            setChats(filteredChats);
        } catch (error) {
            console.error('Ошибка при получении чатов:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadChats();
    }, [uuid]);

    useEffect(() => {
        if (socket) {
            const handleNewMessage = () => {
                loadChats();
            };
            
            const handleChatCreated = () => {
                loadChats();
            };

            socket.onMessage(handleNewMessage);
            socket.onChatCreated(handleChatCreated);
            
            return () => {
                socket.offMessage(handleNewMessage);
                socket.offChatCreated(handleChatCreated);
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