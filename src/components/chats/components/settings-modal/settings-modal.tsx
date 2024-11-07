 import { Modal } from "antd";

 const SettingsModal = ({ isOpen, onCancel }: { isOpen: boolean, onCancel: () => void }) => {
    return (
        <Modal title="Settings" 
            open={isOpen} 
            onCancel={onCancel}
            footer={null}
            className="settings-modal"
        >
            <div>SettingsModal</div>
        </Modal>
    )
 }

 export default SettingsModal;