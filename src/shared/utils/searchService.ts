import { apiInstance, getHeaders } from "../../api/global";

export const searchUsers = async (value: string) => {
    const response = await apiInstance.post(`/user/search`, {
        query: value
    }, {headers: getHeaders()});
    return response.data;
}