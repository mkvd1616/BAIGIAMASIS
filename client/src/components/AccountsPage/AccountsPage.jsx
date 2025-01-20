import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/accounts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Err');
        }
        return response.json();
      })
      .then(response => response.json())
      .then(data => {
        setAccounts(data);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Akauntai</h1>
      {loading && <p>Kraunama...</p>}
      <ul>
        {accounts.map(account => (
          <li key={account._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/account/${account._id}`}>{account.iban} - Balansas: {account.balance}</Link>
          <button onClick={() => handleDelete(account._id)}>Ištrinit</button>
            <Link to={`/account/${account._id}`}>{account.iban} - Balansas: {account.balance}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsPage;
