import ChatMessage from "../chat-message";
import avatar from "../../../../assets/avatar.svg";
import { useParams } from 'react-router-dom';
import { Message, User } from "../../../../shared/interfaces/chats";
import { useState, useEffect } from "react";
import { getMessages } from "../../../../shared/utils/services/chatService";

const user: User = {
    avatar: avatar,
    name: 'John Doe',
    uuid: '123',
};

const message: Message = {
    uuid: '123',
    content: 'random message',
    createdAt: new Date("2024-11-05T10:14:11.626Z"),
    updatedAt: new Date("2024-11-05T10:14:11.626Z"),
    userUuid: '123',
    chatUuid: '123',
    user: user
};

const ChatWinMessages = () => {
    const { uuid } = useParams();
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        getMessages(uuid!).then(data => {
            setMessages(data.messages);
        });
    }, []);
    return (
        <div className="flex flex-col items-start">
            {messages.map((message: Message) => (
                <ChatMessage key={message.uuid} {...message} />
            ))}
        </div>
    )
}

export default ChatWinMessages;