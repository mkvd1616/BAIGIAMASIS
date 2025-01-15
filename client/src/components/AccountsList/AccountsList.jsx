import React, { useState } from 'react';

const AccountsList = ({ accounts, onDelete }) => {
  return (
    <div className="container">
      <h2>Saskaitu sarašas </h2>
      <ul className="list-group">
        {accounts.map(account => (
          <li key={account.id} className="list-group-item d-flex justify-content-between">
            {account.name} - {account.balance}$
            <div>
              <button className="btn btn-danger" onClick={() => onDelete(account.id)}>
                Ištrinti
              </button>
              <a href={`/add-funds/${account.id}`} className="btn btn-success ms-2">
                Papildyti saskaita
              </a>
              <a href={`/withdraw-funds/${account.id}`} className="btn btn-warning ms-2">
                Išimti lėšas
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsList;
