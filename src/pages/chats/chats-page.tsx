import ChatSidebar from "../../components/chats/chat-sidebar";
import ChatChooser from "../../components/chats/chat-chooser";
import ChatWin from "../../components/chats/chat-win";

const ChatsPage = () => {
    return (
        <div className="flex min-h-screen bg-main-2 text-text-color">
            <ChatSidebar />
            <ChatChooser />
            <ChatWin />
        </div>
    )
}

export default ChatsPage;