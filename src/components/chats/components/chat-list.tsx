import { useEffect, useState } from "react";
import { getChats } from "../../../shared/utils/services/chatService";
import { Chat } from "../../../types/chat";
import { Chats } from "../../../types/chat";
import ChatEntity from "./chat-entity";
import { useParams } from "react-router-dom";

const ChatList = () => {
    const [chats, setChats] = useState<Chats>([]);
    const { uuid } = useParams();
    
    useEffect(() => {
        getChats().then(data => {
            setChats(data);
        });
    }, []);
    
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