import { Button, Input } from "antd";
import { UserInfo } from "../../../../../shared/interfaces/user";
import { useState, useEffect } from "react";
import { updateUser } from "../../../../../shared/utils/services/userService";

const SettingsEditTag = ({ user, closeModal, refetchUser }: { 
    user: UserInfo | undefined, 
    closeModal: () => void,
    refetchUser: () => void 
}) => {
    const [tag, setTag] = useState(user!.username);
    useEffect(() => {
        setTag(user!.username);
    }, [user, closeModal]);

    const handleSave = async () => {
        await updateUser({username: tag});
        refetchUser();
        closeModal();
    }

    return (
        <div>
            <p className="text-main-4 text-sm mb-1">Имя</p>
            <Input 
                className="settings-edit-input"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                maxLength={20}
                placeholder="username"
                prefix="@"
            />
            <div className="flex justify-end mt-4">
                <Button type="primary" onClick={handleSave}>Сохранить</Button>
            </div>
        </div>
    )
}

export default SettingsEditTag;