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
                loadChats(setChats, setIsLoading, uuid!);
            };
            
            const handleChatCreated = () => {
                loadChats(setChats, setIsLoading, uuid!);
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