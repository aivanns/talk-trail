import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { SEND_PLACEHOLDER } from "../../../../shared/constants/chats";
import { useSocket } from "../../../../shared/contexts/SocketContext";
import { useParams } from "react-router-dom";

const ChatWinSend = () => {
    const [message, setMessage] = useState('');
    const { socket } = useSocket();
    const { uuid } = useParams();

    const handleSend = () => {
        if (message.trim() && socket && uuid) {
            socket.sendMessage({
                chatUuid: uuid,
                content: message
            });
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center">
            <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='h-[2.5rem] w-full bg-main-3 rounded-xl my-5 pl-3 ml-5 focus:outline-none' 
                placeholder={SEND_PLACEHOLDER}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IoIosSend 
                className="w-8 h-8 text-main-4 my-5 mx-5 cursor-pointer" 
                onClick={handleSend}
            />
        </div>
    );
};

export default ChatWinSend;