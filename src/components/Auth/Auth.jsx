import React from 'react';
import logo from '../../assets/logo.svg';

export default function Auth() {
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-main-2">
      <div className="bg-main-1 p-12 rounded-lg shadow-lg w-[40rem] h-[36rem]">
        <div className="flex items-center justify-center">
          <h1 className="text-7xl font-bold text-center text-main-4">TalkTrail</h1>
          <img src={logo} alt="" className='w-20 h-20 ml-2'/>
        </div>
        <div className="bg-main-2 p-4 rounded-lg mt-10">
          <form className="">
            <div className="mb-4">
              <label className="block text-text-color">Почта</label>
              <input
                type="email"
                placeholder="Введите почту"
                className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-main-4"
              />
            </div>
            <div className="mb-4">
              <label className="block text-text-color">Пароль</label>
              <input
                type="password"
                placeholder="Введите пароль"
                className="w-full p-2 mt-1 bg-main-3 text-text-color rounded-lg focus:outline-none focus:ring focus:ring-main-4"
              />
            </div>
            <div className="mb-4">
            </div>
            <button className="w-56 py-2 mt-10 bg-main-4 text-text-color rounded-xl hover:bg-main-3 mx-auto block">
              Войти
            </button>
          </form>
          <p className="mt-4 text-center text-text-color">
            Еще нет аккаунта? <a href="#" className="text-main-4 underline">Зарегестрироваться</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
