import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Registration from './components/Registration/Registration';
import RegistrationSecond from './components/Registration/RegistrationSecond';
import Main from './components/Main/Main';
import Auth from './components/Auth/Auth';
import RegistrationScreen from './components/Registration/RegistrationScreen';
import MainChat from './components/Chats/MainChat';
import { isAuthenticated } from './utils/TokenService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/registration" element={<RegistrationScreen />} />
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/chats" element={isAuthenticated() ? <MainChat /> : <Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
