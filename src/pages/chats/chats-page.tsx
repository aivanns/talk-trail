import ChatSidebar from "../../components/chats/chat-sidebar";
import ChatSideList from "../../components/chats/chat-side-list";
import ChatWin from "../../components/chats/chat-win";

const ChatsPage = () => {
    return (
        <div className="flex min-h-screen min-w-max bg-main-2 text-text-color">
            <ChatSidebar />
            <ChatSideList />
            <ChatWin />
        </div>
    )
}

export default ChatsPage;