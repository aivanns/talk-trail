import { apiInstance } from "../../../api/global";
import { getHeaders } from "../../../api/global";
import { UserInfo } from "../../interfaces/user";

export const getSelfUser = async (): Promise<UserInfo> => {
    const response = await apiInstance.get('/user/self', {
        headers: getHeaders()
    });
    return response.data;
}