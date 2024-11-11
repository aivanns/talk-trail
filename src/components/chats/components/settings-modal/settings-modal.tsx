import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CloseOutlined } from "@ant-design/icons";
import avatar from "../../../../assets/avatar.svg";
import { UserInfo } from "../../../../shared/interfaces/user";
import Separator from "../user-modal/components/separator";
import { formatTimeAgo } from "../../../../shared/utils/services/chatService";
import { useEffect, useState } from "react";
import { MAX_DESCRIPTION_LENGTH } from "../../../../shared/constants/modal";
import UserEditModal from "./settings-edit-modal";
import SettingsEditElement from "./components/settings-edit-element";
import { FaFolder, FaHashtag, FaSignOutAlt } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { getUser, updateUser } from "../../../../shared/utils/services/userService";
import { validateDescription } from "../../../../shared/utils/services/validationService";
import { logout } from "../../../../shared/utils/services/authService";
import { useNavigate } from "react-router-dom";

const SettingsModal = ({ isOpen, onCancel }: { isOpen: boolean, onCancel: () => void}) => {
    const navigate = useNavigate();

    const [descriptionLength, setDescriptionLength] = useState(0);
    const [description, setDescription] = useState<string | null>(null);
    const [isUserNameEditModalOpen, setIsUserNameEditModalOpen] = useState(false);
    const [isUserTagEditModalOpen, setIsUserTagEditModalOpen] = useState(false);
    const [isUserFolderEditModalOpen, setIsUserFolderEditModalOpen] = useState(false);
    const [user, setUser] = useState<UserInfo | undefined>(undefined);
    const counterColor = descriptionLength > MAX_DESCRIPTION_LENGTH ? 'text-red-500' : 'text-main-4';

    useEffect(() => {
        if (isOpen) {
            refetchUser();
        }
    }, [isOpen]);

    useEffect(() => {
        if (user) {
            setDescription(user.description || null);
            setDescriptionLength(user.description?.length || 0);
        }
    }, [user]);

    const refetchUser = async () => {
        const updatedUser = await getUser();
        setUser(updatedUser);
        setDescription(updatedUser?.description || null);
    }

    const openModal = (modal: React.Dispatch<React.SetStateAction<boolean>>) => {
        modal(true);
    };
    
    const closeModal = (modal: React.Dispatch<React.SetStateAction<boolean>>) => {
        modal(false);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
        setDescriptionLength(e.target.value.length);
    };

    const handleCancel = () => {
        if (!validateDescription(description || "")) return;
        if (description !== user?.description) {
            updateUser({description: description || ""});
        }
        setDescription(null);
        setDescriptionLength(0);
        onCancel();
    }

    const handleLogout = () => {
        logout(navigate);
    }

    return (
        user && (
        <Modal title="Настройки" 
            open={isOpen} 
            onCancel={handleCancel}
            footer={null}
            className="settings-modal"
            width={450}
            closeIcon={<CloseOutlined className="text-main-3" />}
        >
            <div className="flex flex-col items-center justify-center">
                <img src={avatar} alt="avatar" className="min-w-28 rounded-full"/>
                <p className="text-xl text-text-color mt-2 font-semibold">{user.name}</p>
                <p className="text-sm text-main-4 cursor-pointer mt-1">{formatTimeAgo(user.lastTimeOnline)}</p>
                {/* Description */}
                <div className="flex items-center justify-center mt-4 w-full">
                    <TextArea 
                        value={description || ""}
                        placeholder="Описание" 
                        className="settings-input scrollbar-hide"
                        autoSize={{ minRows: 1, maxRows: 6 }}
                        onChange={handleDescriptionChange}
                        maxLength={1000}
                    />
                    <p className={`text-md ${counterColor} ml-4`}>{MAX_DESCRIPTION_LENGTH - descriptionLength}</p>
                </div>
                <div className="w-full mt-4">
                    <SettingsEditElement openUserEditModal={() => openModal(setIsUserNameEditModalOpen)} name="Имя" value={user.name} icon={<FaRegUserCircle className="text-main-4 text-lg mr-4" />} />
                    <SettingsEditElement openUserEditModal={() => openModal(setIsUserTagEditModalOpen)} name="Тег" value={`@${user.username}`} icon={<FaHashtag className="text-main-4 text-lg mr-4" />} />
                    <SettingsEditElement openUserEditModal={() => openModal(setIsUserFolderEditModalOpen)} name="Папки" value={user.folders?.length.toString()!} icon={<FaFolder className="text-main-4 text-lg mr-4" />} />
                    <Separator />
                    <div onClick={handleLogout} className="flex items-center gap-4 h-10 justify-center hover:bg-main-3 transition-colors duration-150 cursor-pointer">
                        <FaSignOutAlt className="text-red-500 text-lg" />
                        <p className="text-red-500 text-sm text-center font-bold">Выйти</p>
                    </div>
                    <p className="text-main-4 text-sm mt-2 text-center">{user.uuid}</p>
                </div>
            </div>
            <UserEditModal isOpen={isUserNameEditModalOpen} onCancel={() => closeModal(setIsUserNameEditModalOpen)} title="Редактирование имени" user={user} type="name" refetchUser={refetchUser} />
            <UserEditModal isOpen={isUserTagEditModalOpen} onCancel={() => closeModal(setIsUserTagEditModalOpen)} title="Редактирование тега" user={user} type="tag" refetchUser={refetchUser} />
            <UserEditModal isOpen={isUserFolderEditModalOpen} onCancel={() => closeModal(setIsUserFolderEditModalOpen)} title="Редактирование папок" user={user} type="folder" refetchUser={refetchUser} />
        </Modal>
        )
    )
 }

 export default SettingsModal;