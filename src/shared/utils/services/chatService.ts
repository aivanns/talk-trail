import { apiInstance, getHeaders } from "../../../api/global";
import { Chat, UserChat } from "../../../types/chat";

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

export const createChat = async (companionUuid: string) => {
    const response = await apiInstance.post(`/chat/`, {
        companionUuid
    }, {headers: getHeaders()});
    return response.data;
}

export const deleteChat = async (chatUuid: string) => {
    const response = await apiInstance.delete(`/chat/${chatUuid}`, {headers: getHeaders()});
    return response.data;
}

export const createOrGetChat = async (companionUuid: string) => {
    try {
        const chats = await getChats();
        const existingChat = chats.find((chat: Chat) => 
            chat.userChats.some((userChat: UserChat) => userChat.user.uuid === companionUuid)
        );
        
        if (existingChat) {
            return existingChat;
        }
        
        return await createChat(companionUuid);
    } catch (error) {
        throw error;
    }
}

export const formatMessageTime = (timestamp: string | undefined) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: userTimeZone });
};

const getTimeString = (value: number, forms: [string, string, string]): string => {
    const lastDigit = value % 10;
    const lastTwoDigits = value % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${value} ${forms[2]}`;
    if (lastDigit === 1) return `${value} ${forms[0]}`;
    if (lastDigit >= 2 && lastDigit <= 4) return `${value} ${forms[1]}`;
    return `${value} ${forms[2]}`;
}

export const formatTimeAgo = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    
    const diffMinutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000);
    const hours = Math.floor(diffMinutes / 60);
    
    if (diffMinutes < 1) return 'был в сети только что';
    
    if (hours >= 8) {
        const days = Math.floor(hours / 24);
        const time = formatMessageTime(timestamp);
        
        if (days === 0) return `был в сети в ${time}`;
        return `был в сети в ${time}, ${getTimeString(days, ['день', 'дня', 'дней'])} назад`;
    }
    
    if (hours >= 1) {
        return `был в сети ${getTimeString(hours, ['час', 'часа', 'часов'])} назад`;
    }
    
    return `был в сети ${getTimeString(diffMinutes, ['минуту', 'минуты', 'минут'])} назад`;
}
