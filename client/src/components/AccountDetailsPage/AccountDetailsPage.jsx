import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AccountDetailsPage = () => {
  const { id } = useParams(); 
  const [account, setAccount] = useState(null);

  useEffect(() => {
    fetch(`/api/accounts/${id}`)
      .then(response => response.json())
      .then(data => setAccount(data))
      .catch(error => console.error( error));
  }, [id]);

  return (
    <div>
      <h1>Paskyros detalės</h1>
      <p>IBAN: {account.iban}</p>
      <p>Balansas: {account.balance}</p>
    </div>
  );
};

export default AccountDetailsPage;
