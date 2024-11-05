import ChatMessage from "../chat-message";
import { useParams, useNavigate } from 'react-router-dom';
import { SocketMessage } from "../../../../shared/interfaces/chats";
import { useState, useEffect, useRef } from "react";
import { getMessages } from "../../../../shared/utils/services/chatService";
import { useSocket } from "../../../../shared/contexts/SocketContext";
import { SelfUser } from "../../../../shared/interfaces/user";
import { getUser } from "../../../../shared/utils/services/userService";

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
        console.log('Получено новое сообщение:', message);
        console.log('Текущий uuid:', uuid);
        console.log('UUID чата сообщения:', message.chat.uuid);
        
        if (message.chat.uuid === uuid) {
            console.log('Добавляем сообщение в чат');
            setMessages(prevMessages => [...prevMessages, message]);
            scrollToBottom();
        }
    };

    useEffect(() => {
        getUser().then(data => {
            setCurrentUser(data);
        });

        if (socket) {
            console.log('Регистрируем обработчик сообщений для чата:', uuid);
            socket.onMessage(handleNewMessage);
        }

        return () => {
            if (socket) {
                console.log('Удаляем обработчик сообщений для чата:', uuid);
                socket.offMessage(handleNewMessage);
            }
        };
    }, [uuid, socket]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!uuid) return;
            
            try {
                const data = await getMessages(uuid);
                console.log('Загружены сообщения для чата:', uuid, data.messages);
                setMessages(data.messages || []);
                scrollToBottom();
            } catch (error: any) {
                if (error.response?.status === 404) {
                    navigate('/chats');
                }
            }
        };

        setMessages([]); // Очищаем сообщения при смене чата
        loadMessages();
    }, [uuid]);

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