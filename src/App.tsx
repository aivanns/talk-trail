import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './shared/constants/routes'
import AuthPage from './pages/auth/auth-page'
import RegistrationForm from './components/auth/registration-form'
import AuthForm from './components/auth/auth-form'
import { Navigate } from 'react-router-dom'
import ChatsPage from './pages/chats/chats-page'
import ProtectedRoute from './shared/middleware/protected-route'
import ChatWin from './components/chats/chat-win'
import { SocketProvider } from './shared/contexts/SocketContext'

function App() {

  return (
    <SocketProvider>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.AUTH.REGISTER} />} />

        <Route path={ROUTES.AUTH.ROOT} element={<AuthPage />}>
          <Route index element={<Navigate to={ROUTES.AUTH.NESTED.LOGIN} />} />
          <Route path={ROUTES.AUTH.NESTED.LOGIN} element={<AuthForm />} />
          <Route path={ROUTES.AUTH.NESTED.REGISTER} element={<RegistrationForm />} />
        </Route>

        <Route path={ROUTES.CHATS.ROOT} element={<ProtectedRoute><ChatsPage /></ProtectedRoute>}>
          <Route path={ROUTES.CHATS.NESTED.CHAT} element={<ChatWin />} />
        </Route>
      </Routes>
    </SocketProvider>
  )
}

export default App
