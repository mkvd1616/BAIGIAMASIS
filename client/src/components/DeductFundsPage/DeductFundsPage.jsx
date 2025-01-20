import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeductFundsPage = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/accounts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('err');
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

    fetch(`/api/accounts/${id}/deduct-funds`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('err');
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
      <h1>Išimti pinigus</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {account && (
        <div>
          <p>Paskyros savinikas: {account.name} {account.surname}</p>
          <p>Dabartinis balansas: {account.balance} EUR</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Išimama suma:</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <button type="submit">Išimti</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeductFundsPage;
