import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [personalId, setPersonalId] = useState('');
  const [passportPhoto, setPassportPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPassportPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('accountNumber', accountNumber);
    formData.append('personalId', personalId);
    if (passportPhoto) {
      formData.append('passportPhoto', passportPhoto);
    }

    try {
      const response = await axios.post('http://localhost:3000/accounts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message); // Сообщение об успешном создании
    } catch (error) {
      console.error("Error creating account:", error);
      alert('Error creating account');
    }
  };

  return (
    <div className="container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            className="form-control"
            id="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="personalId">Personal ID</label>
          <input
            type="text"
            className="form-control"
            id="personalId"
            value={personalId}
            onChange={(e) => setPersonalId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passportPhoto">Passport Photo</label>
          <input
            type="file"
            className="form-control"
            id="passportPhoto"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
