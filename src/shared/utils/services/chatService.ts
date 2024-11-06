import { apiInstance, getHeaders } from "../../../api/global";
import { Chat, UserChat } from "../../../types/chat";
import { ROUTES } from "../../constants/routes";
import { SocketMessage } from "../../interfaces/chats";

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
    const chats = await getChats();
    const existingChat = chats.find((chat: Chat) => 
        chat.userChats.some((userChat: UserChat) => userChat.user.uuid === companionUuid)
    );
    
    if (existingChat) {
        return existingChat;
    }
    
    return await createChat(companionUuid);
}

export const loadMessages = async (uuid: string, setMessages: (messages: SocketMessage[]) => void, navigate: (path: string) => void) => {
    if (!uuid) return;
    
    try {
        const data = await getMessages(uuid);
        setMessages(data.messages || []);
    } catch (error: any) {
        if (error.response?.status === 404) {
            navigate(ROUTES.CHATS.ROOT);
        }
    }
};

export const loadChats = async (setChats: (chats: Chat[]) => void, setIsLoading: (isLoading: boolean) => void, uuid: string) => {
    setIsLoading(true);
    try {
        const data = await getChats();
        const filteredChats = data
            .filter((chat: Chat) => {
                return chat.messages.length > 0 || chat.uuid === uuid;
            })
            .sort((a: Chat, b: Chat) => {
                const lastMessageA = a.messages[a.messages.length - 1];
                const lastMessageB = b.messages[b.messages.length - 1];
                
                if (!lastMessageA) return 1;
                if (!lastMessageB) return -1;
                
                return new Date(lastMessageB.createdAt).getTime() - new Date(lastMessageA.createdAt).getTime();
            });
        setChats(filteredChats);
        return filteredChats;
    } catch (error) {
        console.error('Ошибка при получении чатов:', error);
        throw error;
    } finally {
        setIsLoading(false);
    }
};

export const groupMessagesByDate = (messages: SocketMessage[]) => {
    const groups: { [key: string]: SocketMessage[] } = {};
    
    messages.forEach(message => {
        const date = new Date(message.createdAt).toLocaleDateString('ru-RU');
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(message);
    });
    
    return groups;
};

export const formatMessageTime = (timestamp: Date | undefined) => {
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

export const formatTimeAgo = (timestamp: Date | undefined) => {
    if (!timestamp) return '';
    
    const now = new Date();
    const date = new Date(timestamp);
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const days = Math.floor(hours / 24);
    
    const isToday = now.getDate() === date.getDate() && 
                    now.getMonth() === date.getMonth() && 
                    now.getFullYear() === date.getFullYear();
                    
    if (diffMinutes < 1) return 'был в сети только что';
    
    if (!isToday) {
        const time = formatMessageTime(timestamp);
        const isYesterday = new Date(now.setDate(now.getDate() - 1)).getDate() === date.getDate();
        
        if (isYesterday) {
            return `был в сети вчера в ${time}`;
        }
        
        if (days === 1) {
            return `был в сети день назад в ${time}`;
        }
        
        return `был в сети ${getTimeString(days, ['день', 'дня', 'дней'])} назад в ${time}`;
    }
    
    if (hours >= 1) {
        return `был в сети ${getTimeString(hours, ['час', 'часа', 'часов'])} назад`;
    }
    
    return `был в сети ${getTimeString(diffMinutes, ['минуту', 'минуты', 'минут'])} назад`;
}
