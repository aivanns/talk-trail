export const ROUTES = {
    AUTH: {
      ROOT: '/auth',
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      NESTED: {
        LOGIN: 'login',
        REGISTER: 'register'
      }
    },
    CHATS: '/chats',
    ROOT: '/'
  } as const