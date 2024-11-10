import { FaCog } from "react-icons/fa";
import avatar from '../../assets/avatar.svg';
import { useEffect, useState } from "react";
import UserSelfModal from "./components/user-modal/self/user-self-modal";
import { UserInfo } from "../../shared/interfaces/user";
import { getSelfUser } from "../../shared/utils/services/modalService";
import SettingsModal from "./components/settings-modal/settings-modal";

const ChatSidebar = () => {
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [user, setUser] = useState<UserInfo | null>(null);

    const openUserModal = () => {
        setIsUserModalOpen(true);
    };

    const closeUserModal = () => {
        setIsUserModalOpen(false);
    };

    const openSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    const closeSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    useEffect(() => {
        getSelfUser().then((user) => {
            setUser(user);
        });
    }, []);

    return (
        <>
            {user && <UserSelfModal isOpen={isUserModalOpen} closeModal={closeUserModal}/>}
            {user && <SettingsModal isOpen={isSettingsModalOpen} onCancel={closeSettingsModal}/>}
            <div className='h-[90dvh] w-20 bg-main-1 rounded-r-2xl self-center resize-none flex-shrink-0 flex flex-col justify-between'>
                <div className='flex justify-center'>
                <img src={avatar} alt="avatar" className='w-14 h-14 rounded-full mt-3 cursor-pointer' onClick={() => openUserModal()} />
            </div>
            <div className='flex justify-center mb-5'>
                <FaCog className="text-4xl text-gray-300 hover:text-main-4 cursor-pointer" onClick={() => openSettingsModal()} />
                </div>
            </div>
        </>
    )
}

export default ChatSidebar;