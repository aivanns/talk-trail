import { useEffect, useState } from "react";
import { getChats } from "../../../shared/utils/services/chatService";
import { Chat } from "../../../types/chat";
import { Chats } from "../../../types/chat";
import ChatEntity from "./chat-entity";

const ChatList = () => {
    const [chats, setChats] = useState<Chats>([]);
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
                />
            ))}
        </div>
    );
}

export default ChatList;