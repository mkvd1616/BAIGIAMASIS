import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="container">
      <h1>Sveiki</h1>
      <p>Pasirinkite veiksmus:</p>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        <li className="btn btn-primary mb-3">Saskaitu sarašas</li>
        <li><Link to="/create-account" className="btn btn-secondary">Sukurti nauja paskyra</Link></li>
      </ul>
    </div>
  );
};

export default Homepage;
