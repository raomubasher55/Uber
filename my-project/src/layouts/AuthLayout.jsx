import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <div style={{ padding: '20px', border: '1px solid black' }}>
    <h1>Welcome to the Auth Section</h1>
    <p>Please log in or sign up to access more features.</p>
    {/* Outlet renders nested routes */}
    <Outlet />
  </div>
);

export default AuthLayout;
