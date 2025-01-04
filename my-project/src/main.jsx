import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Start from './pages/Start.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import AuthLayout from './layouts/AuthLayout.jsx'; // Import the layout

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Public route */}
      <Route index element={<Start />} />

      {/* Auth routes grouped under AuthLayout */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<UserLogin />} />
        <Route path="register" element={<UserSignup />} />
        <Route path="captain/login" element={<CaptainLogin />} />
        <Route path="captain/register" element={<CaptainSignup />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(<App />);
