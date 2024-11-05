import axios from 'axios';
import { getToken } from '../shared/utils/services/tokenService';
import notificationService from '../shared/utils/services/notificationService';
import { ERROR } from '../shared/constants/notification';

export const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 3000,
});

export const getHeaders = () => ({
    Authorization: `Bearer ${getToken()}`
});

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status) {
            return new Promise(() => notificationService.error(ERROR, error.response?.data?.message || 'Произошла ошибка'));
        }
        return Promise.reject(error);
    }
);