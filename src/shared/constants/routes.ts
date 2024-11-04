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
    CHATS: {
      ROOT: '/chats',
      NESTED: {
        CHAT: ':uuid'
      }
    },
    ROOT: '/'
  } as const