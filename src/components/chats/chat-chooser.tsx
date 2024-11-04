import { SEARCH_PLACEHOLDER } from "../../shared/constants/chats";

const ChatChooser = () => {
    return (
        <div className='flex justify-center h-[90dvh] w-96 bg-main-1 rounded-2xl self-center ml-10 resize-none flex-shrink-0'>
            <input type="text" className='h-[2.5rem] w-[22rem] bg-main-3 rounded-xl mt-3 pl-3 focus:outline-none' placeholder={SEARCH_PLACEHOLDER}/>
        </div>
    )
}

export default ChatChooser;