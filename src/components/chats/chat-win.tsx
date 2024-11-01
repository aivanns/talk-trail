import { IoIosMore, IoIosSearch, IoIosSend } from "react-icons/io";
import { SEND_PLACEHOLDER } from "../../shared/constants/chats";
import avatar from "../../assets/avatar.svg";
import ChatMessage from "./chat-message";

const ChatWin = () => {
    return (
        <div className='self-center w-full mx-10 min-w-[50%] h-[50rem]'>
            <div className='flex justify-between content-center h-[3.5rem] w-full bg-main-3 rounded-t-2xl'>
                <div className='ml-5'>
                    <p className="text-text-color text-lg pt-1">aivanns</p>
                    <p className='text-[#778DA9] text-sm leading-none'>был в сети 5 минут назад</p>
                </div>
                <div className='mr-5 mt-3 flex gap-4'>
                <IoIosSearch className="text-3xl text-main-4 hover:text-text-color cursor-pointer" />
                    <IoIosMore className="text-3xl text-main-4 hover:text-text-color cursor-pointer" />
                </div>
            </div>
            <div className='h-[46.5rem] w-full bg-main-1 rounded-b-2xl flex flex-col justify-end'>
                <div className="flex flex-col items-start">
                    <ChatMessage message="12313jkfdskjfsdlksdkfkjsfdkаылаавылоаыолвлдаоыаыоваолывлдаыволаываловлоаыдлаодлавоаыдлjfdsjlkfdjlkfdsflkjdfdlkjsfsdlkjsdlkfsjdlkdfjlkjdfkdjksjslkdjldskfojjfokkirknfoei" avatar={avatar} isLastInSequence={true} />
                    <ChatMessage message="12jlkjdfkdjksjslkdjldskfojjfokkirknfoei" avatar={avatar} isLastInSequence={false} />
                </div> 
                <div className="flex justify-center items-center">
                    <input type="text" className='h-[2.5rem] w-full bg-main-3 rounded-xl my-5 pl-3 ml-5 focus:outline-none' placeholder={SEND_PLACEHOLDER} />
                    <IoIosSend className="w-8 h-8 text-main-4 my-5 mx-5 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default ChatWin;