import { IoIosSearch } from "react-icons/io"

import { IoIosMore } from "react-icons/io"
const ChatWinHeader = () => {
    return (
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
    )
}

export default ChatWinHeader;