import { notification } from 'antd';
import type { NotificationType } from '../../../types/global';
import type { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { LoginFieldType } from '../../../types/auth';
import { RegistrationFieldType } from '../../../types/auth';

const openNotification = (type: NotificationType, message: string, description: string) => {
    notification[type]({
        message: message,
        description: description,
        placement: 'topRight',
    });
};

const openNotificationWithErrors = (errorInfo: ValidateErrorEntity<RegistrationFieldType | LoginFieldType>) => {
    const uniqueErrors = new Set();
        errorInfo.errorFields.forEach((field: { errors: string[] }) => {
            field.errors.forEach((error: string) => {
                uniqueErrors.add(error);
            });
        });
        uniqueErrors.forEach((error) => {
            openNotification('error', 'Ошибка!', error as string);
        });
};

export default {
    success: (message: string, description: string) => openNotification('success', message, description),
    error: (message: string, description: string) => openNotification('error', message, description),
    info: (message: string, description: string) => openNotification('info', message, description),
    warning: (message: string, description: string) => openNotification('warning', message, description),
    errorWithMany: (errorInfo: ValidateErrorEntity<RegistrationFieldType | LoginFieldType>) => openNotificationWithErrors(errorInfo),
};