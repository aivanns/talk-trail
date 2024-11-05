import ChatMessage from "../chat-message";
import { useParams } from 'react-router-dom';
import { SocketMessage } from "../../../../shared/interfaces/chats";
import { useState, useEffect, useRef } from "react";
import { getMessages } from "../../../../shared/utils/services/chatService";
import { useSocket } from "../../../../shared/contexts/SocketContext";
import { SelfUser } from "../../../../shared/interfaces/user";
import { getUser } from "../../../../shared/utils/services/userService";

const ChatWinMessages = () => {
    const { uuid } = useParams();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<SocketMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<SelfUser | null>(null);
    const { socket } = useSocket();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        getUser().then(data => {
            setCurrentUser(data);
        });
        getMessages(uuid!).then(data => {
            setMessages(data.messages);
        });

        const handleNewMessage = (message: SocketMessage) => {
            if (message.chat.uuid === uuid) {
                setMessages(prevMessages => {
                    const messageExists = prevMessages.some(m => m.uuid === message.uuid);
                    if (messageExists) {
                        return prevMessages;
                    }
                    return [...prevMessages, message];
                });
            }
        };

        
        if (socket) {
            socket.onMessage(handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.offMessage(handleNewMessage);
            }
        };
    }, [uuid, socket]);

    return (
        <div className="flex flex-col items-start h-full overflow-y-auto scrollbar-hide">
            {messages.map((message: SocketMessage) => (
                <ChatMessage key={message.uuid} {...message} currentUser={currentUser!} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWinMessages;