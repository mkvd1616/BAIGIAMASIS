import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const activeStyle = { fontWeight: 'bold', color: 'blue' };
  return (
    <nav>
      <ul>
        <li><Link to="/" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Paskyros</Link></li>
        <li><Link to="/login" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Prisijungti</Link></li>
        <li><Link to="/register" style={({ isActive }) => (isActive ? activeStyle : undefined)}>Registruoti</Link></li>
      </ul>
    </nav>
  );
};
export default Navbar;
