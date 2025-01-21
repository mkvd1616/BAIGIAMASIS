import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [personalCode, setPersonalCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, personalCode }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then(err => { throw new Error(err); });
        }
        return response.json();
      })
      .then(() => navigate('/login')) 
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h1>Registracija</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Slaptažodis:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Asmens kodas:</label>
          <input type="text" value={personalCode} onChange={(e) => setPersonalCode(e.target.value)} />
        </div>
        <button type="submit">Registruoti</button>
      </form>
    </div>
  );
};

export default RegisterPage;
