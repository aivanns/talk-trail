import { apiInstance } from "../../../api/global";

export const createFolder = async (name: string, chatUuids: string[]) => {
    const response = await apiInstance.post('/folder', {name: name, chatUuids: chatUuids});
    return response.data;
}

export const getFolders = async () => {
    const response = await apiInstance.get('/folder');
    return response.data;
}