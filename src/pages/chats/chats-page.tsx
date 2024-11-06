import { useEffect } from "react";
import { useSocket } from "../../shared/hooks/useSocket";
import { socketConnect } from "../../shared/utils/socket-io/socketConnectService";
import ChatSidebar from "../../components/chats/chat-sidebar";
import ChatSideList from "../../components/chats/chat-side-list";
import { Outlet, useLocation } from "react-router-dom";
import { CHAT_SELECT_PLACEHOLDER } from "../../shared/constants/chats";

const ChatsPage = () => {
    const { socket } = useSocket();
    const location = useLocation();
    const isMainPage = location.pathname.split('/').filter(Boolean).length === 1;

    useEffect(() => {
        socketConnect(socket);
    }, [socket]);

    return (
        <div className="flex min-h-screen min-w-max bg-main-2 text-text-color">
            <ChatSidebar />
            <ChatSideList />
            {isMainPage ? (
                <p className="text-text-color text-2xl bg-main-1 rounded-xl p-4 h-[7dvh] self-center m-auto">
                    {CHAT_SELECT_PLACEHOLDER}
                </p>
            ) : (
                <Outlet />
            )}
        </div>
    )
}

export default ChatsPage;