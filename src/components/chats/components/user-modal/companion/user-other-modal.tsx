import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import Separator from "../components/separator";
import { USER_MODAL_TITLE } from "../../../../../shared/constants/modal";
import avatar from "../../../../../assets/avatar.svg";
import { formatTimeAgo, getCompanionInfo } from "../../../../../shared/utils/services/chatService";
import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { UserInfo } from "../../../../../shared/interfaces/user";
import { useParams } from "react-router-dom";

const UserOtherModal = ({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) => {
    const { uuid } = useParams();
    const [user, setUser] = useState<UserInfo | undefined>(undefined);

    const refetchUser = async () => {
        const updatedUser = await getCompanionInfo(uuid!);
        setUser(updatedUser);
    }

    useEffect(() => {
        refetchUser();
    }, [isOpen]);

    return user ? (
        <Modal
            title={USER_MODAL_TITLE}
            open={isOpen}
            onCancel={() => closeModal()}
            footer={null}
            className="user-modal"
            closeIcon={<CloseOutlined className="text-main-3" />}
        >
            <div className="flex items-center my-6">
                <img src={user.avatar ? user.avatar : avatar} alt="Avatar" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col ml-6">
                    <p className="text-xl text-text-color">{user.name}</p>
                    <p className="text-sm text-main-4 cursor-pointer">{formatTimeAgo(user.lastTimeOnline)}</p>
                </div>
            </div>
            <Separator />
            <div className="flex items-start my-6">
                <FaInfoCircle className="text-main-4 text-xl mr-4" />
                <div className="flex flex-col flex-1">
                    <p className="text-sm text-text-color whitespace-pre-wrap break-words">{user.description ? user.description : 'Нет описания'}</p>
                    <p className="text-xs text-main-4 mt-1 opacity-75">Описание</p>
                    <p className="text-sm text-main-4 mt-5">{`@${user.username}`}</p>
                    <p className="text-xs text-main-4 mt-1 opacity-75">Имя пользователя</p>
                </div>
            </div>
            <Separator />
            <div className="flex items-center justify-center">
                <p className="text-sm text-main-4">{user.uuid}</p>
            </div>
        </Modal>
    ) : null;
};

export default UserOtherModal;