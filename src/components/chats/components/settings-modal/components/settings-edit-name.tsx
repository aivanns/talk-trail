import { Button, Input } from "antd";
import { UserInfo } from "../../../../../shared/interfaces/user";
import { useState, useEffect } from "react";
import { updateUser } from "../../../../../shared/utils/services/userService";

const SettingsEditName = ({ user, closeModal, refetchUser }: { 
    user: UserInfo | undefined, 
    closeModal: () => void,
    refetchUser: () => void 
}) => {
    const [name, setName] = useState(user!.name);
    
    useEffect(() => {
        setName(user!.name);
    }, [user, closeModal]);

    const handleSave = async () => {
        await updateUser({name: name});
        refetchUser();
        closeModal();
    }

    return (
        <div>
            <p className="text-main-4 text-sm mb-1">Имя</p>
            <Input 
                className="settings-edit-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                placeholder="Имя"
            />
            <div className="flex justify-end mt-4">
                <Button type="primary" onClick={handleSave}>Сохранить</Button>
            </div>
        </div>
    )
}

export default SettingsEditName;