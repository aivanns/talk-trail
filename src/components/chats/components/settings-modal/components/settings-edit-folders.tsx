import { UserInfo } from "../../../../../shared/interfaces/user";

const SettingsEditFolders = ({ user, closeModal, refetchUser }: { user: UserInfo, closeModal: () => void, refetchUser: () => void }) => {
    return (
        <div>
            {user.folders?.map((folder) => (
                <div key={folder.uuid}>
                    <p>{folder.name}</p>
                </div>
            ))}
        </div>
    )
}

export default SettingsEditFolders;