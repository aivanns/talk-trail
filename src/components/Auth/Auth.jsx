import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { login } from '../../utils/AuthService';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/TokenService';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const isAuth = () => {
    if (isAuthenticated()) {
      navigate('/chats');
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response) {
      navigate('/chats');
      window.location.reload();
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-main-2">
      <div className="bg-main-1 p-12 rounded-lg shadow-lg w-[40rem] h-[36rem]">
        <div className="flex items-center justify-center">
          <h1 className="text-7xl font-bold text-center text-main-4">TalkTrail</h1>
          <img src={logo} alt="" className='w-20 h-20 ml-2'/>
        </div>
        <div className="bg-main-2 p-4 rounded-lg mt-10">
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-text-color">Почта</label>
              <input
                type="email"
                placeholder="Введите почту"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-main-4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-text-color">Пароль</label>
              <input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-main-4"
              />
            </div>
            <button type="submit" className="w-56 py-2 mt-10 bg-main-4 text-text-color rounded-xl hover:bg-main-3 mx-auto block">
              Войти
            </button>
          </form>
          <p className="mt-4 text-center text-text-color">
            Еще нет аккаунта? <Link to="/registration" className="text-main-4 underline">Зарегестрироваться</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
