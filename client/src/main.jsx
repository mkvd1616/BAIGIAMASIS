import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import AccountDetailsPage from './components/AccountDetailsPage/AccountDetailsPage.jsx';
import AccountsPage from './pages/AccountsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CreateAccountPage from './pages/CreateAccountPage.jsx';
import AddFundsPage from './pages/AddFundsPage.jsx';
import DeductFundsPage from './pages/DeductFundsPage.jsx';

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
