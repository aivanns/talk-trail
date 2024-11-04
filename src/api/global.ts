import axios from 'axios';
import { getToken } from '../shared/utils/services/tokenService';

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
        if (error.response?.status === 404) {
            return new Promise(() => {});
        }
        return Promise.reject(error);
    }
);