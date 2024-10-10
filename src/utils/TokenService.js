import { jwtDecode } from 'jwt-decode';

export const setToken = (token, refreshToken = null) => {
  localStorage.setItem('token', token);
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = (refreshToken = false) => {
  localStorage.removeItem('token');
  if (refreshToken) {
    localStorage.removeItem('refreshToken');
  }
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    const { exp } = jwtDecode(token);
    if (exp < Date.now() / 1000) {
      removeToken();
      return false;
    }
    return true;
  } catch (e) {
    removeToken();
    return false;
  }
};