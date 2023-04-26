import React from 'react';

// Fonts
import './assets/css/fonts.css';

// Components
import ItemPage from './pages/ItemPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ItemPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
