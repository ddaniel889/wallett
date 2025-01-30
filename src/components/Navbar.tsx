import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="bg-blue-600 p-4 text-white">
    <div className="flex space-x-4">
      <Link to="/tutorials" className="hover:text-gray-300 font-bold">
        Tutorials
      </Link>
      <Link to="/add" className="hover:text-gray-300">
        Add
      </Link>
    </div>
  </nav>
  );
}
