import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Fonts
import './assets/css/fonts.css';

// Components
import ItemPage from './pages/ItemPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/routing/Layout';
import RequireAuth from './components/routing/RequireAuth';
import TestPage from './pages/TestPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

        {/* Public routes */}
        <Route index element={<TestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<ItemPage />} />
        </Route>

    </Routes>
  );
}

export default App;
