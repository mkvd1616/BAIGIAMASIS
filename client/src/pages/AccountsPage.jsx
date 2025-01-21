import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AccountsPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/accounts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Err');
        }
        return response.json();
      })
      .then(data => {
        setAccounts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/accounts/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('err');
        }
        setAccounts(accounts.filter(account => account._id !== id));
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h1>Paskyros</h1>
      {loading && <p>Kraunama...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {accounts.map(account => (
          <li key={account._id} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={`/account/${account._id}`}>{account.iban} - Balansas: {account.balance}</Link>
            <button onClick={() => handleDelete(account._id)}>Ištrinit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountsPage;
