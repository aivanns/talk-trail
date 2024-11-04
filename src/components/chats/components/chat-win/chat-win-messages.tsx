import ChatMessage from "../chat-message";
import avatar from "../../../../assets/avatar.svg";
import { useParams } from 'react-router-dom';

const ChatWinMessages = () => {
    const { uuid } = useParams();

    return (
        <div className="flex flex-col items-start">
            <ChatMessage message="random message" avatar={avatar} isLastInSequence={true} />
        </div>
    )
}

export default ChatWinMessages;