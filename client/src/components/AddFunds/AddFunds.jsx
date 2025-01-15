import React, { useState } from 'react';
import axios from 'axios';

const AddFunds = ({ accountId, accountName, balance }) => {
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/api/accounts/${accountId}/add-funds`, { amount })
      .then(response => {
        alert('Pinigai idėti');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Papildyti saskaita</h2>
      <p>{accountName} Balansas: {balance}$</p>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="form-control"
          placeholder="Suma"
        />
        <button type="submit" className="btn btn-primary mt-2">Papildyti saskaita</button>
      </form>
    </div>
  );
};

export default AddFunds;
