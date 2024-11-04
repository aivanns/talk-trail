import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import type { DecodedToken } from '../interfaces/auth';
import { apiInstance } from '../../api/global';

export const setToken = (token: string, refreshToken: string | null = null) => {
  Cookies.set('token', token, {sameSite: 'Strict' });
  if (refreshToken) {
    Cookies.set('refreshToken', refreshToken, {sameSite: 'Strict' });
  }
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = (refreshToken = false) => {
  Cookies.remove('token');
  if (refreshToken) {
    Cookies.remove('refreshToken');
  }
};

export const getRefreshToken = () => {
  return Cookies.get('refreshToken');
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const { exp } = decodedToken;
    
    if (typeof exp === 'number' && exp < Date.now() / 1000) {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        removeToken(true);
        return false;
      }

      try {
        const { data } = await apiInstance.post('/auth/refresh', { refreshToken });
        const { token: newToken, refreshToken: newRefreshToken } = data;
        setToken(newToken, newRefreshToken);
        return true;
      } catch (error) {
        console.error('Ошибка обновления токена:', error);
        removeToken(true);
        return false;
      }
    }
    return true;
  } catch (e) {
    console.error('Ошибка декодирования токена:', e);
    removeToken(true);
    return false;
  }
};