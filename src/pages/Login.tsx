import React, { useState } from "react";
import { Link } from "react-router-dom";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthService from "../services/auth.service";
 
export default function Login() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
 
  const login = () => {
    const data = { email};
    console.log('login value')
    console.log(data)
    AuthService.authUser(data)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
 


  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };

 
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Wallet </h4>
 
          <div className="mb-2">
            <label className="block mb-1 font-medium">Email</label>
           <Input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded w-full px-2 py-1"
              value={email}
              onChange={handleInputEmail}
            />
          </div>
          <Button
            className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Ingresar'
            onClick={login}
          />
          <div className="mt-1.5">
          <Link to="/register" className="font-medium text-amber-900  text-sm">
             Registrate
          </Link>
          </div>
        </div>
   
    </div>
  );
}
 
