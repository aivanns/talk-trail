import { apiInstance } from "../../../api/global";

import { getHeaders } from "../../../api/global";

export const getUser = async () => {
    const response = await apiInstance.get(`/user/self`, {headers: getHeaders()});
    return response.data;
}