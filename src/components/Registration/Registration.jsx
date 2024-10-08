import React from 'react';
import logo from '../../assets/logo.svg';

export default function Registration() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-main-2">
      <div className="bg-main-1 p-8 rounded-lg shadow-lg w-[32rem]">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center text-main-4">TalkTrail</h1>
          <img src={logo} alt="" className='w-14 h-14 ml-2'/>
        </div>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-300">Почта</label>
            <input
              type="email"
              placeholder="Введите почту"
              className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Пароль</label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Повторите пароль</label>
            <input
              type="password"
              placeholder="Введите пароль еще раз"
              className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button className="w-48 py-2 mt-4 bg-blue-600 text-text-color rounded-xl hover:bg-blue-700 mx-auto block">
            Зарегистрироваться
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Уже есть аккаунт? <a href="#" className="text-blue-500">Войти</a>
        </p>
      </div>
    </div>
    </>
  );
} 
