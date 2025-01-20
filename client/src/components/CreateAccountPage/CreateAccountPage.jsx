import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccountPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [personalCode, setPersonalCode] = useState('');
  const [passportPhoto, setPassportPhoto] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('personalCode', personalCode);
    formData.append('passportPhoto', passportPhoto);

    fetch('/api/accounts', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('err');
        }
        return response.json();
      })
      .then(() => {
        navigate('/accounts');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h1>Sukurti paskyra</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Vardas:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Pavardė:</label>
          <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
        </div>
        <div>
          <label>Asmens kodas:</label>
          <input type="text" value={personalCode} onChange={(e) => setPersonalCode(e.target.value)} required />
        </div>
        <div>
          <label>Paso kopija:</label>
          <input type="file" onChange={(e) => setPassportPhoto(e.target.files[0])} required />
        </div>
        <button type="submit">Sukurti</button>
      </form>
    </div>
  );
};

export default CreateAccountPage;
