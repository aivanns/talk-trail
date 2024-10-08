import React, { useState } from 'react';
import defaultAvatar from '../../assets/avatar.svg';

const RegistrationSecond = () => {
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-main-2">
      <div className="w-[40rem] h-[36rem] p-8 space-y-8 bg-main-1 rounded-lg">
        
        <div className="bg-main-2 rounded-lg mt-12 p-10 w-[30rem] h-[26rem] mx-auto flex flex-col justify-center">
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="flex w-32 h-32 mb-4 overflow-hidden rounded-full bg-main-3">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
                ) : (
                  <img src={defaultAvatar} alt="Default Avatar" className="object-cover w-full h-full" />
                )}
              </div>
              <label className="px-4 py-2 text-sm font-medium text-text-color bg-main-4 rounded-md cursor-pointer hover:bg-main-3">
                Выберите файл
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
                Имя пользователя
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 text-text-color bg-main-3 rounded-md focus:outline-none focus:ring-2 focus:ring-main-4"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-8">
            <button className="px-4 py-2 text-sm font-medium text-text-color bg-red-500 rounded-md hover:bg-red-400">
              Назад
            </button>
            <button className="px-4 py-2 text-sm font-medium text-text-color bg-main-4 rounded-md hover:bg-main-3">
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSecond;

