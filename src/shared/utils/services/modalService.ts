import { apiInstance } from "../../../api/global";
import { getHeaders } from "../../../api/global";
import { SelfUser } from "../../interfaces/user";

export const getSelfUser = async (): Promise<SelfUser> => {
    const response = await apiInstance.get('/user/self', {
        headers: getHeaders()
    });
    return response.data;
}