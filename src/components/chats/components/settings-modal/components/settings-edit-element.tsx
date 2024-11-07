const SettingsEditElement = ({ openUserEditModal, name, value, icon }: { openUserEditModal: () => void, name: string, value: string, icon: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-between w-full bg-main-2 p-2 hover:bg-main-3 cursor-pointer" onClick={openUserEditModal}>
            <div className="flex items-center">
                {icon}
                <p className="text-base text-text-color font-semibold">{name}</p>
            </div>
            <p className="text-base text-text-color font-semibold">{value}</p>
        </div>
    )
}

export default SettingsEditElement;