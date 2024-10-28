import { Route, Routes } from 'react-router-dom'
import AuthPage from './pages/auth/auth-page'
import RegistrationForm from './components/auth/registration-form'
import AuthForm from './components/auth/auth-form'

function App() {

  return (
    <>
      <Routes>
        <Route path="" element={<></>} />

        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<AuthForm />} />
          <Route path="register" element={<RegistrationForm />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
