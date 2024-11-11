import { Folder } from "../../../../../shared/interfaces/folders";

const SettingsFolderElement = ({ openUserEditModal, folder, icon }: { openUserEditModal: () => void, folder: Folder, icon: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-between w-full bg-main-2 p-2 hover:bg-main-3 cursor-pointer" onClick={openUserEditModal}>
            <div className="flex items-center">
                {icon}
                <p className="text-base text-text-color font-semibold">{folder.name}</p>
            </div>
        </div>
    )
}

export default SettingsFolderElement;