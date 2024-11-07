import axios from 'axios';
import { getToken, removeToken } from '../shared/utils/services/tokenService';
import notificationService from '../shared/utils/services/notificationService';
import { ERROR } from '../shared/constants/notification';
import { SKIP_ERROR_NOTIFICATION_ENDPOINTS } from '../shared/constants/interceptor';
import { ROUTES } from '../shared/constants/routes';

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
        if (error.response?.status === 401) {
            removeToken();
            window.location.href = ROUTES.AUTH.LOGIN;
            return Promise.reject(error);
        }

        const isSkipNotification = SKIP_ERROR_NOTIFICATION_ENDPOINTS.some(endpoint => 
            error.config?.url?.includes(endpoint)
        );

        if (error.response?.status && !isSkipNotification) {
            return new Promise(() => notificationService.error(ERROR, error.response?.data?.message || 'Произошла ошибка'));
        }
        return Promise.reject(error);
    }
);