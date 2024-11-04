import { Input } from 'antd';
import { SEARCH_PLACEHOLDER } from "../../shared/constants/chats";

const ChatChooser = () => {
    return (
        <div className='flex justify-center h-[90dvh] w-96 bg-main-1 rounded-2xl self-center ml-10 resize-none flex-shrink-0'>
            <Input 
                placeholder={SEARCH_PLACEHOLDER}
                className='search-input'
            />
        </div>
    )
}

export default ChatChooser;