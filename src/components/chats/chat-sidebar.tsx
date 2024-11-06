import { FaCog } from "react-icons/fa";
import avatar from '../../assets/avatar.svg';
import { useEffect, useState } from "react";
import UserSelfModal from "./components/user-modal/self/user-self-modal";
import { SelfUser } from "../../shared/interfaces/user";
import { getSelfUser } from "../../shared/utils/services/modalService";

const ChatSidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<SelfUser | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        getSelfUser().then((user) => {
            setUser(user);
        });
    }, []);

    return (
        <>
            {user && <UserSelfModal isOpen={isModalOpen} closeModal={closeModal} user={user} />}
            <div className='h-[90dvh] w-20 bg-main-1 rounded-r-2xl self-center resize-none flex-shrink-0 flex flex-col justify-between'>
                <div className='flex justify-center'>
                <img src={avatar} alt="avatar" className='w-14 h-14 rounded-full mt-3 cursor-pointer' onClick={() => openModal()} />
            </div>
            <div className='flex justify-center mb-5'>
                <FaCog className="text-4xl text-gray-300 hover:text-main-4 cursor-pointer" />
                </div>
            </div>
        </>
    )
}

export default ChatSidebar;