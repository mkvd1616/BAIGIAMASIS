import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AccountDetailsPage from './pages/AccountDetailsPage';
import AccountsPage from './pages/AccountsPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import CreateAccountPage from './components/CreateAccountPage/CreateAccountPage';
import AddFundsPage from './components/AddFundsPage/AddFundsPage';
import DeductFundsPage from './components/DeductFundsPage/DeductFundsPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar /> 
      <div className="container">
        <Routes>

          <Route path="/" element={<AccountsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:id" element={<AccountDetailsPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/account/:id/add-funds" element={<AddFundsPage />} />
          <Route path="/account/:id/deduct-funds" element={<DeductFundsPage />} />
          <Route path="*" element={<h1>Šis puslapis nebuvo rastas</h1>} />
        
          </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
