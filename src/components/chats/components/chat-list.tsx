import { useEffect, useState } from "react";
import { Chat } from "../../../types/chat";
import { Chats } from "../../../types/chat";
import ChatEntity from "./chat-entity";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../shared/hooks/useSocket";
import { loadChats } from "../../../shared/utils/services/chatService";

const ChatList = () => {
    const [chats, setChats] = useState<Chats>([]);
    const [_, setIsLoading] = useState(false);
    const { uuid } = useParams();
    const { socket } = useSocket();
    
    

    useEffect(() => {
        loadChats(setChats, setIsLoading, uuid!);
    }, [uuid]);

    useEffect(() => {
        if (socket) {
            const handleNewMessage = () => {
                console.log('Получено новое сообщение');
                loadChats(setChats, setIsLoading, uuid!);
            };
            
            const handleChatCreated = async (data: any) => {
                try {
                    console.log('Создан новый чат');
                    setIsLoading(true);
                    const chats = await loadChats(setChats, setIsLoading, uuid!);
                    console.log('Получены новые чаты:', chats);
                } catch (error) {
                    console.error('Ошибка загрузки чатов:', error);
                } finally {
                    setIsLoading(false);
                }
            };

            socket.onMessage(handleNewMessage);
            socket.onChatCreated(handleChatCreated);
            
            return () => {
                socket.offMessage(handleNewMessage);
                socket.offChatCreated(handleChatCreated);
            };
        }
    }, [socket, uuid, chats]);

    useEffect(() => {
        console.log('Чаты обновились:', chats);
    }, [chats]);

    return (
        <div className="flex flex-col items-start h-full overflow-y-auto scrollbar-hide">
            {Array.isArray(chats) && chats.map((chat: Chat) => (
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