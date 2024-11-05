import { apiInstance, getHeaders } from "../../../api/global";

export const getChats = async () => {
    const response = await apiInstance.get(`/chat/`, {headers: getHeaders()});
    return response.data;
}

export const getMessages = async (chatUuid: string) => {
    const response = await apiInstance.get(`/chat/${chatUuid}`, {headers: getHeaders()});
    return response.data;
}

export const formatMessageTime = (timestamp: string | undefined) => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: userTimeZone });
};
