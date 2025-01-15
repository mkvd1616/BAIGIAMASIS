import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    accountNumber: '',
    idNumber: '',
    passportPhoto: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      passportPhoto: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }
    axios.post('/api/accounts', data)
      .then(response => {
        alert('Sukurta paskyra');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="container">
      <h2>Naujos paskyros sukurymas</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="form-control"
          placeholder="Vardas"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
          placeholder="Pavardė"
        />
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Saskaitos numeris"
        />
        <input
          type="text"
          name="idNumber"
          value={formData.idNumber}
          onChange={handleChange}
          className="form-control"
          placeholder="Asmens kodas"
        />
        <input
          type="file"
          name="passportPhoto"
          onChange={handleFileChange}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Sukurti</button>
      </form>
    </div>
  );
};

export default CreateAccount;
