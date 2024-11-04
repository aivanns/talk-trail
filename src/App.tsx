import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './shared/constants/routes'
import AuthPage from './pages/auth/auth-page'
import RegistrationForm from './components/auth/registration-form'
import AuthForm from './components/auth/auth-form'
import { Navigate } from 'react-router-dom'
import ChatsPage from './pages/chats/chats-page'
import ProtectedRoute from './shared/middleware/protected-route'

function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.AUTH.REGISTER} />} />

        <Route path={ROUTES.AUTH.ROOT} element={<AuthPage />}>
          <Route index element={<Navigate to={ROUTES.AUTH.NESTED.REGISTER} />} />
          <Route path={ROUTES.AUTH.NESTED.LOGIN} element={<AuthForm />} />
          <Route path={ROUTES.AUTH.NESTED.REGISTER} element={<RegistrationForm />} />
        </Route>

        <Route path={ROUTES.CHATS} element={<ProtectedRoute><ChatsPage /></ProtectedRoute>} />

      </Routes>
    </>
  )
}

export default App
