import { IoIosSend } from "react-icons/io";
import { SEND_PLACEHOLDER } from "../../../../shared/constants/chats";

const ChatWinSend = () => {
    return (
        <div className="flex justify-center items-center">
            <input type="text" className='h-[2.5rem] w-full bg-main-3 rounded-xl my-5 pl-3 ml-5 focus:outline-none' placeholder={SEND_PLACEHOLDER} />
            <IoIosSend className="w-8 h-8 text-main-4 my-5 mx-5 cursor-pointer" />
        </div>
    )
}

export default ChatWinSend;