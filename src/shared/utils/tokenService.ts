import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import type { DecodedToken } from '../interfaces/auth';

export const setToken = (token: string, refreshToken: string | null = null) => {
  Cookies.set('token', token, { secure: true, sameSite: 'Strict' });
  if (refreshToken) {
    Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });
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

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const decodedToken: DecodedToken = jwtDecode(token);
    const { exp } = decodedToken;
    if (typeof exp === 'number' && exp < Date.now() / 1000) {
      removeToken();
      return false;
    }
    return true;
  } catch (e) {
    console.error('Ошибка декодирования токена:', e);
    removeToken();
    return false;
  }
};