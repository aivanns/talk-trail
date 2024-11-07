import { apiInstance } from "../../../api/global";
import { UserUpdate } from "../../interfaces/user";
import { getHeaders } from "../../../api/global";

export const getUser = async () => {
    const response = await apiInstance.get(`/user/self`, {headers: getHeaders()});
    return response.data;
}

export const updateUser = async (user: UserUpdate) => {
    const response = await apiInstance.put(`/user`, user, {headers: getHeaders()});
    return response.data;
}
