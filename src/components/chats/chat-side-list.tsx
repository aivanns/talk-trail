import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { SEARCH_PLACEHOLDER } from "../../shared/constants/chats";
import ChatList from './components/chat-list';
import ChatUserSearch from './components/chat-user-search';
import { searchUsers } from '../../shared/utils/services/searchService';
import { useSocket } from '../../shared/hooks/useSocket';
import { User } from '../../types/chat';

const ChatSideList = () => {
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [_, setUpdateTrigger] = useState(0);
    const { socket } = useSocket();

    useEffect(() => {
        const handleNewMessage = () => {
            setUpdateTrigger(prev => prev + 1);
        };

        if (socket) {
            socket.onMessage(handleNewMessage);
        }

        return () => {
            if (socket) {
                socket.offMessage(handleNewMessage);
            }
        };
    }, [socket]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchValue) {
                searchUsers(searchValue).then(res => {
                    setUsers(res);
                });
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            setUsers([]);
        };
    }, [searchValue]);

    return (
        <div className='flex flex-col items-center h-[90dvh] w-96 bg-main-1 rounded-2xl self-center ml-10 resize-none flex-shrink-0'>
            <Input 
                placeholder={SEARCH_PLACEHOLDER}
                className='search-input w-[90%] my-4'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className='w-[90%]'>
                {searchValue ? (
                    <ChatUserSearch 
                        users={users} 
                        clearSearch={() => setSearchValue('')} 
                    />
                ) : <ChatList />}
            </div>
        </div>
    )
}

export default ChatSideList;