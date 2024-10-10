import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { isAuthenticated } from '../../utils/TokenService';
import { useNavigate } from 'react-router-dom';
export default function Registration({handler}) {
  const navigate = useNavigate();

  const isAuth = () => {
    if (isAuthenticated()) {
      navigate('/chats');
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    localStorage.setItem('regData', JSON.stringify({email, password}));
    handler(2);
  };

  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-main-2">
      <div className="bg-main-1 p-8 rounded-lg shadow-lg w-[40rem] h-[36rem]">
        <div className="flex items-center justify-center">
          <h1 className="text-7xl font-bold text-center text-main-4">TalkTrail</h1>
          <img src={logo} alt="" className='w-20 h-20 ml-2'/>
        </div>
        <div className="bg-main-2 p-4 rounded-lg mt-7">
          <form className="">
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
            <div className="mb-4">
            <label className="block text-text-color">Повторите пароль</label>
            <input
              type="password"
              placeholder="Введите пароль еще раз"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-main-4"
            />
          </div>
          <button onClick={(e) => handleRegister(e)} className="w-56 py-2 mt-8 bg-main-4 text-text-color rounded-xl hover:bg-main-3 mx-auto block">
            Зарегистрироваться
          </button>
          </form>
          <p className="mt-4 text-center text-text-color">
          Уже есть аккаунт? <Link to="/auth" className="text-main-4 underline cursor-pointer">Войти</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
