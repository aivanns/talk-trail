import React from 'react';
import { FaCog } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import avatar from '../../assets/avatar.svg';
import { removeToken } from '../../utils/TokenService';

export default function MainChat() {

    const handleExit = () => {
        removeToken(true);
        window.location.reload();
    }

  return (
    <div className="flex min-h-screen bg-main-2 text-text-color">
        <div className='h-[50rem] w-20 bg-main-1 rounded-r-2xl self-center resize-none flex-shrink-0'>
            <div className='flex justify-center'>
                <img src={avatar} alt="avatar" className='w-14 h-14 rounded-full mt-3' />
            </div>
            <button onClick={() => handleExit()} className='w-14 h-14 bg-main-3 rounded-full mt-[37.5rem] mx-auto block'>Exit</button>
            <div className="flex justify-center mt-[1rem]">
                <FaCog className="text-4xl text-gray-300 hover:text-main-4 cursor-pointer" />
            </div>
            
        </div>
        <div className='flex justify-center h-[50rem] w-96 bg-main-1 rounded-2xl self-center ml-10 resize-none flex-shrink-0'>
            <input type="text" className='h-[2.5rem] w-[22rem] bg-main-3 rounded-xl mt-3 pl-3 focus:outline-none' placeholder='Поиск'/>
        </div>
        <div className='self-center ml-10'>
            <div className='h-[3.5rem] w-[64rem] bg-main-3 rounded-t-2xl'>
                <div className='ml-5'>
                    <p className="text-text-color text-lg pt-1">aivanns</p>
                    <p className='text-[#778DA9] text-sm leading-none'>был в сети 5 минут назад</p>
                </div>
            </div>
            <div className='h-[46.5rem] w-[64rem] bg-main-1 rounded-b-2xl flex flex-col justify-end'>
                <div className="flex justify-center items-center">
                  <input type="text" className='h-[2.5rem] w-[57rem] bg-main-3 rounded-xl mb-5 mt-3 pl-3 mr-3 focus:outline-none' placeholder='Введите сообщение...' />
                  <IoIosSend className="w-8 h-8 text-main-4 mb-5 ml-2 mt-3 cursor-pointer" />
                </div>
            </div>
        </div>
    </div>
  );
}