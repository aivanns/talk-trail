import { Modal } from "antd";
import { UserInfo } from "../../../../shared/interfaces/user";
import { CloseOutlined } from "@ant-design/icons";
import SettingsEditName from "./components/settings-edit-name";
import SettingsEditTag from "./components/settings-edit-tag";
import SettingsEditFolders from "./components/settings-edit-folders";

const UserEditModal = ({ isOpen, onCancel, title, user, type, refetchUser }: { 
    isOpen: boolean, 
    onCancel: () => void, 
    title: string, 
    user: UserInfo, 
    type: "name" | "tag" | "folder",
    refetchUser: () => void
}) => {
    return (
            <Modal 
                title={title} 
                open={isOpen} 
                onCancel={onCancel} 
                footer={null}
                className="settings-modal"
                width={450}
                closeIcon={<CloseOutlined className="text-main-3" />}
            >
            {type === "name" && <SettingsEditName user={user} closeModal={onCancel} refetchUser={refetchUser} />}
            {type === "tag" && <SettingsEditTag user={user} closeModal={onCancel} refetchUser={refetchUser} />}
            {type === "folder" && <SettingsEditFolders user={user} closeModal={onCancel} refetchUser={refetchUser} />}
        </Modal>
    )
}

export default UserEditModal;

