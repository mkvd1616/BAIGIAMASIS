import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage/HomePage';
import AccountsList from './components/AccountsList/AccountsList';
import CreateAccount from './components/CreateAccount/CreateAccount';
import AddFunds from './components/AddFunds/AddFunds';
import WithdrawFunds from './components/WithdrawFunds/WithdrawFunds';


function App() {
  return (
    <Router>
      <Routes>
  
        <Route path="/" element={<Homepage />} />
        <Route path="/accounts" element={<AccountsList />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/add-funds/:accountId" element={<AddFunds />} />
        <Route path="/withdraw-funds/:accountId" element={<WithdrawFunds />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
