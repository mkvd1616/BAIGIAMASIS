import React, { useState } from 'react';
import axios from 'axios';

const WithdrawFunds = ({ accountId, accountName, balance }) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/accounts/${accountId}/withdraw-funds`, { amount })
      .then(response => {
        alert('Pinigai išimti');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Pinigu išėmimas</h2>
      <p>{accountName} Balansas: {balance}$</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="form-control"
          placeholder="Suma"
        />
        <button type="submit" className="btn btn-danger mt-2">Lėšu išėmimas</button>
      </form>
    </div>
  );
};

export default WithdrawFunds;
