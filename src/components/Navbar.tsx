import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-blue-600 p-4 text-white">
        <div className="flex space-x-4">
          <Link to="/balance/:id" className="hover:text-gray-300">
            Recarga
          </Link>
          <Link to="/payment" className="hover:text-gray-300">
            Pagos
          </Link>
        </div>
      </nav>
  );
}
