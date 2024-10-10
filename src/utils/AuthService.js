import axios from 'axios';
import { setToken } from './TokenService';
import { API_URL } from '../static';

export const register = async (email, password, username) => {
  const response = await axios.post(`${API_URL}/auth/signup`, {username, password, email});
  if (response.status === 200) { 
    setToken(response.data.accessToken, response.data.refreshToken);
    return true;
  }
  return false;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/signin`, { email, password });
    if (response.status === 200) {
        setToken(response.data.accessToken, response.data.refreshToken);
        return true;
    }
    return false;
};

