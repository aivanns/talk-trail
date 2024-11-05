import avatar from '../../../assets/avatar.svg';
import type { User } from '../../../types/chat';
import { formatMessageTime } from '../../../shared/utils/services/chatService';

const ChatSearchEntity = ({user}: {user: User}) => {
    return (
        <div key={user.uuid} className='flex flex-row items-center justify-start bg-main-2 rounded-xl w-full h-16 mt-4 hover:bg-main-3 transition-colors duration-150 cursor-pointer'>
                    <div className='w-10 h-10 bg-main-3 rounded-full ml-4'>{user.avatar == null ? <img src={avatar} alt='avatar' /> : <img src={user.avatar} alt='avatar' />}</div>
                    <div className='flex flex-col items-start justify-start'>
                        <div className='ml-4'>{user.name}</div>
                        <div className='ml-4 text-sm text-gray-color'>{`@${user.username}`}</div>
                    </div>
                    <div className='ml-auto mr-4 text-sm text-gray-color'>{user.lastTimeOnline ? formatMessageTime(user.lastTimeOnline) : 'null'}</div>
                </div>
    )
}

export default ChatSearchEntity;