import { Message } from '../../../shared/interfaces/chats';

const ChatMessage = ({ content, createdAt, userUuid, user }: Message) => {
    const isLastInSequence = true;
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const dateObj = new Date(createdAt);
    const formattedTime = dateObj.toLocaleTimeString('ru-RU', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: userTimeZone 
    });

    return (
        <div className="flex items-start mb-4 ml-8">
            
                {isLastInSequence ? (
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                </div>
            ) : <div className="w-10 mr-4"></div>}
            
            <div className="flex flex-col w-full">
                <div className="bg-main-3 rounded-lg py-2 px-3 max-w-2xl w-full break-words relative">
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