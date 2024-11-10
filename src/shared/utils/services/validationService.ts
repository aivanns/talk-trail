import notificationService from "./notificationService";

export const validateName = (name: string) => {
    if (name.length < 1) {
        notificationService.error("Ошибка валидации", "Имя не может быть пустым");
        return false;
    }
    if (name.length > 30) {
        notificationService.error("Ошибка валидации", "Имя не может быть длиннее 30 символов");
        return false;
    }
    return true;
}

export const validateUsername = (username: string) => {
    if (username.length < 1) {
        notificationService.error("Ошибка валидации", "Имя не может быть пустым");
        return false;
    }
    if (username.length > 20) {
        notificationService.error("Ошибка валидации", "Тег не может быть длиннее 20 символов");
        return false;
    }
    return true;
}

export const validateDescription = (description: string) => {
    if (description.length > 200) {
        notificationService.error("Ошибка валидации", "Описание не может быть длиннее 200 символов");
        return false;
    }
    return true;
}

export const validateMessage = (message: string) => {
    if (message.length < 1) {
        notificationService.error("Ошибка валидации", "Сообщение не может быть пустым"); // TODO: tut nado sdelat' po kajfu
        return false;
    }
    return true;
}
