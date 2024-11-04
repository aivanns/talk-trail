import { setToken } from './tokenService';
import { AuthResponse, AuthReturn } from '../../../shared/interfaces/auth';
import { apiInstance } from '../../../api/global';

export const register = async (name: string, password: string, username: string): Promise<AuthReturn> => {
  try {
    const response = await apiInstance.post<AuthResponse>(`/auth/signup`, { username, password, name });
    if (response.status >= 200 && response.status < 300) {
      setToken(response.data.accessToken, response.data.refreshToken);
      return { success: true, message: 'Регистрация прошла успешно!' };
    }
  } catch (error) {
    return { success: false, message: (error as any).message as string };
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
    return { success: false, message: (error as any).message as string };
  }
  return { success: false, message: 'Произошла ошибка при входе' };
};

