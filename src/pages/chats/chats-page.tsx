import ChatSidebar from "../../components/chats/chat-sidebar";
import ChatSideList from "../../components/chats/chat-side-list";
import { Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "../../shared/constants/routes";

const ChatsPage = () => {
    const location = useLocation();
    const isMainPage = location.pathname === ROUTES.CHATS.ROOT || location.pathname === '/chats/';

    return (
        <div className="flex min-h-screen min-w-max bg-main-2 text-text-color">
            <ChatSidebar />
            <ChatSideList />
            {isMainPage ? (
                <p className="text-text-color text-2xl bg-main-1 rounded-xl p-4 h-[7dvh] self-center m-auto">
                    Выберите чат для начала общения
                </p>
            ) : (
                <Outlet />
            )}
        </div>
    )
}

export default ChatsPage;