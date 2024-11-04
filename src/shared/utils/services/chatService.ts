import { apiInstance, getHeaders } from "../../../api/global";

export const getChats = async () => {
    const response = await apiInstance.get(`/chat/`, {headers: getHeaders()});
    return response.data;
}