import React from 'react';
import { Link,useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleClickLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('user');
    localStorage.removeItem('session');
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
        <div className="flex space-x-4">
          <Link to="/balance" className="hover:text-gray-300">
            Recarga
          </Link>
          <Link to="/payment" className="hover:text-gray-300">
            Pagos
          </Link>
          <Link to="/" onClick={handleClickLogout} className="hover:text-gray-300">
            Salir
          </Link>
        </div>
      </nav>
  );
}
