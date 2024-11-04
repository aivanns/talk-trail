import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { SEARCH_PLACEHOLDER } from "../../shared/constants/chats";
import ChatList from './components/chat-list';
import ChatUserSearch from './components/chat-user-search';
import { searchUsers } from '../../shared/utils/searchService';

const ChatSideList = () => {
    const [searchValue, setSearchValue] = useState('');
    const [users, setUsers] = useState([]);

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
                {searchValue ? <ChatUserSearch users={users} /> : <ChatList />}
            </div>
        </div>
    )
}

export default ChatSideList;