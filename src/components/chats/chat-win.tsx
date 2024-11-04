import ChatWinHeader from "./components/chat-win/chat-win-header";
import ChatWinMessages from "./components/chat-win/chat-win-messages";
import ChatWinSend from "./components/chat-win/chat-win-send";

const ChatWin = () => {
    return (
        <div className='self-center w-full mx-10 min-w-[50%] h-[90dvh]'>
            <ChatWinHeader />
            <div className='h-[84dvh] w-full bg-main-1 rounded-b-2xl flex flex-col justify-end'>
                <ChatWinMessages />
                <ChatWinSend />
            </div>
        </div>
    )
}

export default ChatWin;