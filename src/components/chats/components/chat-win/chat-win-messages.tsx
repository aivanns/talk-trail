import ChatMessage from "../chat-message";
import { useParams, useNavigate } from 'react-router-dom';
import { SocketMessage } from "../../../../shared/interfaces/chats";
import { useState, useEffect, useRef } from "react";
import { getMessages } from "../../../../shared/utils/services/chatService";
import { useSocket } from "../../../../shared/contexts/SocketContext";
import { SelfUser } from "../../../../shared/interfaces/user";
import { getUser } from "../../../../shared/utils/services/userService";
import { NO_MESSAGES_PLACEHOLDER } from "../../../../shared/constants/chats";

const ChatWinMessages = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<SocketMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<SelfUser | null>(null);
    const { socket } = useSocket();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleNewMessage = (message: SocketMessage) => {
        if (message.chat.uuid === uuid) {
            setMessages(prevMessages => [...prevMessages, message]);
            scrollToBottom();
        }
    };

    useEffect(() => {
        getUser().then(data => {
            setCurrentUser(data);
        });

        if (socket) {
            socket.onMessage(handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.offMessage(handleNewMessage);
            }
        };
    }, [uuid, socket]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!uuid) return;
            
            try {
                const data = await getMessages(uuid);
                setMessages(data.messages || []);
                scrollToBottom();
            } catch (error: any) {
                if (error.response?.status === 404) {
                    navigate('/chats');
                }
            }
        };

        setMessages([]);
        loadMessages();
    }, [uuid]);

    return (
        <div className="flex flex-col items-start h-full overflow-y-auto scrollbar-hide">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-text-color bg-main-2 px-3 py-2 rounded-xl text-center">{NO_MESSAGES_PLACEHOLDER}</p>
                </div>
            ) : (
                messages.map((message: SocketMessage) => (
                    <ChatMessage key={message.uuid} {...message} currentUser={currentUser!} />
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWinMessages;