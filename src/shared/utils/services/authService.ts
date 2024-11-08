import { isAuthenticated, removeToken, setToken } from './tokenService';
import { AuthResponse, AuthReturn } from '../../../shared/interfaces/auth';
import { apiInstance } from '../../../api/global';
import { ROUTES } from '../../constants/routes';
import { NavigateFunction } from 'react-router-dom';

export const register = async (name: string, password: string, username: string): Promise<AuthReturn> => {
  try {
    const response = await apiInstance.post<AuthResponse>(`/auth/signup`, { username, password, name });
    if (response.status >= 200 && response.status < 300) {
      setToken(response.data.accessToken, response.data.refreshToken);
      return { success: true, message: 'Регистрация прошла успешно!' };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
  return { success: false, message: 'Произошла ошибка при регистрации' };
};

export const login = async (username: string, password: string): Promise<AuthReturn> => {
  try {
    const response = await apiInstance.post<AuthResponse>(`/auth/signin`, { username, password });
    if (response.status >= 200 && response.status < 300) {
      setToken(response.data.accessToken, response.data.refreshToken);
      return { success: true, message: 'Вход выполнен успешно' };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
  return { success: false, message: 'Произошла ошибка при входе' };
};

export const checkAuth = async (setIsAuth: (isAuth: boolean) => void, setIsLoading: (isLoading: boolean) => void) => {
  try {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
      setIsLoading(false);
  } catch (error) {
      setIsLoading(false);
  }
};

export const logout = async (navigate: NavigateFunction) => {
  removeToken();
  navigate(ROUTES.AUTH.ROOT);
};
