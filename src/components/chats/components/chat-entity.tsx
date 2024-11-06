import React from "react";
import { Chat } from "../../../types/chat";
import avatar from '../../../assets/avatar.svg';
import { useNavigate } from 'react-router-dom';
import { formatMessageTime } from '../../../shared/utils/services/chatService';
import { NO_MESSAGES } from "../../../shared/constants/chats";

const ChatEntity = React.memo(({ chat, isActive }: { chat: Chat, isActive: boolean }) => {
    const navigate = useNavigate();
    const user = chat.userChats[0].user;

    const handleClick = () => {
        navigate(`/chats/${chat.uuid}`);
    };

    return (
        <div 
            className={`flex flex-row items-center justify-between rounded-xl w-full h-16 mt-4 hover:bg-main-3 transition-colors duration-150 cursor-pointer ${isActive ? 'bg-main-3' : 'bg-main-2'}`}
            onClick={handleClick}
        >
            <div className='flex flex-row items-center'>
                <div className='w-10 h-10 bg-main-3 rounded-full ml-4'>
                    {user.avatar == null ? <img src={avatar} alt='avatar' /> : <img src={user.avatar} alt='avatar' />}
                </div>
                <div className='flex flex-col items-start justify-start'>
                    <div className='ml-4'>{user.name}</div>
                    <div className='ml-4 text-sm text-gray-color truncate max-w-[200px]'>
                        {chat.messages[0]?.content || NO_MESSAGES}
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-start h-full py-2 mr-4'>
                <div className='text-xs text-gray-color mt-1 mr-1'>
                    {formatMessageTime(chat.messages[0]?.createdAt)}
                </div>
            </div>
        </div>
    )
});

export default ChatEntity;