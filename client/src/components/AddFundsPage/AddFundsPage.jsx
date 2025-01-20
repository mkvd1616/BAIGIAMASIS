import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AddFundsPage = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/accounts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch account details');
        }
        return response.json();
      })
      .then(data => setAccount(data))
      .catch(error => setError(error.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount <= 0) {
      setError('Turi buti daugiau nei 0');
      return;
    }

    fetch(`/api/accounts/${id}/add-funds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Nepaviko pridėti lėšas');
        }
        return response.json();
      })
      .then(() => {
        navigate(`/account/${id}`); 
      })
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <h1>Pridėti lėšas</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {account && (
        <div>
          <p>Paskyros savininkas: {account.name} {account.surname}</p>
          <p>Dabartinis balansas: {account.balance} EUR</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Pridedama suma:</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <button type="submit">Pridėti</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddFundsPage;
