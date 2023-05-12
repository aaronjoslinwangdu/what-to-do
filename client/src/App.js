import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Fonts
import './assets/css/fonts.css';

// Components
import ItemPage from './pages/ItemPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Layout from './components/routing/Layout';
import RequireAuth from './components/routing/RequireAuth';
import TestPage from './pages/TestPage';
import PersistLogin from './components/routing/PersistLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />

        {/* Public routes */}
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<ItemPage />} />
          </Route>
        </Route>

    </Routes>
  );
}

export default App;
