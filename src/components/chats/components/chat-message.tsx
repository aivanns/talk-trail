import { SocketMessage } from '../../../shared/interfaces/chats';
import { formatMessageTime } from '../../../shared/utils/services/chatService';
import { UserInfo } from '../../../shared/interfaces/user';

const ChatMessage = ({ content, createdAt, user, currentUser }: SocketMessage & {currentUser: UserInfo | null}) => {
    if (!user || !currentUser) return null;

    const isLastInSequence = true;
    const formattedTime = formatMessageTime(new Date(createdAt));
    const isUser = user.uuid === currentUser.uuid;
    const messageColor = isUser ? 'bg-main-3' : 'bg-main-2';

    return (
        <div className="flex items-start mt-4 ml-8">    
            {isLastInSequence ? (
                <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                    <img 
                        src={user.avatar} 
                        alt="Avatar" 
                        className="w-full h-full rounded-full object-cover" 
                    />
                </div>
            ) : <div className="w-10 mr-4"></div>}
            
            <div className="flex flex-col">
                <div className={`${messageColor} rounded-lg py-2 px-3 max-w-2xl inline-block break-words relative`}>
                    <span className="text-sm text-text-color pr-12">{content}</span>
                    <span className="text-xs text-text-color absolute bottom-2 right-3">
                        {formattedTime}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;