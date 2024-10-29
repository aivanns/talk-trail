import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/auth-page'
import RegistrationForm from './components/auth/registration-form'
import AuthForm from './components/auth/auth-form'
import { Navigate } from 'react-router-dom'
import ChatsPage from './pages/chats/chats-page'

function App() {

  return (
    <>
      <Routes>
        <Route path="" element={<Navigate to="auth/register" />} />

        <Route path="/auth" element={<AuthPage />}>
          <Route index element={<Navigate to="register" />} />
          <Route path="login" element={<AuthForm />} />
          <Route path="register" element={<RegistrationForm />} />
        </Route>

        <Route path="/chats" element={<ChatsPage />} />

      </Routes>
    </>
  )
}

export default App
