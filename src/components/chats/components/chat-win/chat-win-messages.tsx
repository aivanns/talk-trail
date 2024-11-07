import ChatMessage from "../chat-message";
import { useParams, useNavigate } from 'react-router-dom';
import { SocketMessage } from "../../../../shared/interfaces/chats";
import { useState, useEffect, useRef } from "react";
import { groupMessagesByDate, loadMessages } from "../../../../shared/utils/services/chatService";
import { useSocket } from "../../../../shared/hooks/useSocket";
import { UserInfo } from "../../../../shared/interfaces/user";
import { getUser } from "../../../../shared/utils/services/userService";
import { NO_MESSAGES_PLACEHOLDER } from "../../../../shared/constants/chats";

const ChatWinMessages = () => {
    const { uuid } = useParams();
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<SocketMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
    const { socket } = useSocket();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    const handleNewMessage = (message: SocketMessage) => {
        console.log('Получено новое сообщение в чате:', {
            messageUuid: message.uuid,
            messageChatUuid: message.chat.uuid,
            currentChatUuid: uuid,
            isMatch: message.chat.uuid === uuid
        });
        
        if (message.chat.uuid === uuid) {
            setMessages(prevMessages => {
                console.log('Обновление сообщений:', {
                    prevCount: prevMessages.length,
                    newMessage: message
                });
                return [...prevMessages, message];
            });
        }
    };

    useEffect(() => {
        getUser().then(data => {
            setCurrentUser(data);
        });

        if (socket) {
            console.log('Подписываемся на сообщения для чата:', uuid);
            socket.onMessage(handleNewMessage);
        }

        return () => {
            if (socket) {
                console.log('Отписываемся от сообщений для чата:', uuid);
                socket.offMessage(handleNewMessage);
            }
        };
    }, [uuid, socket]);

    useEffect(() => {
        console.log('Загружаем сообщения для чата:', uuid);
        setMessages([]);
        loadMessages(uuid!, setMessages, navigate);
    }, [uuid]);


    return (
        <div className="flex flex-col items-start h-full overflow-y-auto scrollbar-hide">
            {messages.length === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-text-color bg-main-2 px-3 py-2 rounded-xl text-center">{NO_MESSAGES_PLACEHOLDER}</p>
                </div>
            ) : (
                Object.entries(groupMessagesByDate(messages)).map(([date, dateMessages]) => (
                    <div key={date} className="w-full">
                        <div className="flex justify-center my-4">
                            <span className="bg-main-2 text-text-color px-3 py-1 rounded-xl text-sm">
                                {date}
                            </span>
                        </div>
                        {dateMessages.map((message: SocketMessage) => (
                            <ChatMessage key={message.uuid} {...message} currentUser={currentUser!} />
                        ))}
                    </div>
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatWinMessages;