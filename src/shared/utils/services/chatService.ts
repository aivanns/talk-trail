import { apiInstance, getHeaders } from "../../../api/global";

export const getChats = async () => {
    const response = await apiInstance.get(`/chat/`, {headers: getHeaders()});
    return response.data;
}

export const getMessages = async (chatUuid: string) => {
    const response = await apiInstance.get(`/chat/${chatUuid}`, {headers: getHeaders()});
    return response.data;
}

export const getCompanionInfo = async (chatUuid: string) => {
    const response = await apiInstance.get(`/chat/${chatUuid}/companion-info`, {headers: getHeaders()});
    return response.data;
}

export const formatMessageTime = (timestamp: string | undefined) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: userTimeZone });
};

export const formatTimeAgo = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    
    const diffMinutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    const hours = Math.floor(diffMinutes / 60);
    
    if (diffMinutes < 1) return 'только что';
    
    if (hours >= 8) {
        const days = Math.floor(hours / 24);
        const time = formatMessageTime(timestamp);
        
        if (days === 0) return `был в сети в ${time}`;
        
        const lastDigit = days % 10;
        const lastTwoDigits = days % 100;
        
        let daysStr;
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            daysStr = `${days} дней`;
        } else if (lastDigit === 1) {
            daysStr = `${days} день`;
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            daysStr = `${days} дня`;
        } else {
            daysStr = `${days} дней`;
        }
        
        return `был в сети в ${time}, ${daysStr} назад`;
    }
    
    if (hours >= 1) {
        const lastDigit = hours % 10;
        const lastTwoDigits = hours % 100;
        
        if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
            return `${hours} часов назад`;
        }
        
        if (lastDigit === 1) {
            return `${hours} час назад`;
        }
        
        if (lastDigit >= 2 && lastDigit <= 4) {
            return `${hours} часа назад`;
        }
        
        return `${hours} часов назад`;
    }
    
    const lastDigit = diffMinutes % 10;
    const lastTwoDigits = diffMinutes % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${diffMinutes} минут назад`;
    }
    
    if (lastDigit === 1) {
        return `${diffMinutes} минуту назад`;
    }
    
    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${diffMinutes} минуты назад`;
    }
    
    return `${diffMinutes} минут назад`;
}
