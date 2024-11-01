import { ChatMessageProps } from '../../shared/interfaces/chats';

const ChatMessage = ({ message, avatar, isLastInSequence }: ChatMessageProps) => {
    return (
        <div className="flex items-start mb-4 ml-8">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0 mr-3">
                {isLastInSequence && (
                    <img src={avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                )}
            </div>
            <div className="flex flex-col w-full">
                <div className="bg-main-3 rounded-lg py-2 px-3 max-w-2xl w-full break-words relative">
                    <span className="text-sm text-text-color pr-12">{message}</span>
                    <span className="text-xs text-text-color absolute bottom-2 right-3">{'12:00'}</span>
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;