import { FaCog } from "react-icons/fa";
import avatar from '../../assets/avatar.svg';

const ChatSidebar = () => {
    return (
        <div className='h-[50rem] w-20 bg-main-1 rounded-r-2xl self-center resize-none flex-shrink-0 flex flex-col justify-between'>
            <div className='flex justify-center'>
                <img src={avatar} alt="avatar" className='w-14 h-14 rounded-full mt-3' />
            </div>
            <div className='flex justify-center mb-5'>
                <FaCog className="text-4xl text-gray-300 hover:text-main-4 cursor-pointer" />
            </div>
        </div>
    )
}

export default ChatSidebar;