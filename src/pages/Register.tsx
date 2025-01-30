import React, { useState } from "react";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import AccountService from "../services/account.service";
import { toast } from 'react-toastify';
 
function Register() {
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
 
  const register = () => {
    const data = { document, name, email,lastName, phone };
    AccountService.createAccount(data)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputDocument = (event) => {
    setDocument(event.target.value);
  };

  const handleInputName = (event) => {
    setName(event.target.value);
  };

  const handleInputLastname = (event) => {
    setLastName(event.target.value);
  };

  const handleInputEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleInputPhone = (event) => {
    setPhone(event.target.value);
  };
 

 
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Registro</h4>
 
          <div className="mb-2">
            <label className="block mb-1 font-medium">Número de documento</label>
              <Input
                type="text"
                id="document"
                name="document"
                className="border border-gray-300 rounded w-full px-2 py-1"
                value={document}
                onChange={handleInputDocument}
                />
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-medium">Nombre</label>
              <Input
                type="text"
                id="name"
                name="name"
                className="border border-gray-300 rounded w-full px-2 py-1"
                value={name}
                onChange={handleInputName}
                />
            </div>
 
          <div className="mb-2">
            <label className="block mb-1 font-medium">Apellido</label>
           <Input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-gray-300 rounded w-full px-2 py-1"
                value={lastName}
                onChange={handleInputLastname}
                />
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-medium">Email</label>
           
           <Input
                type="text"
                id="email"
                name="email"
                className="border border-gray-300 rounded w-full px-2 py-1"
                value={email}
                onChange={handleInputEmail}
                />
          </div>

          <div className="mb-2">
            <label className="block mb-1 font-medium">Teléfono</label>
               <Input
                type="number"
                id="phone"
                name="phone"
                className="border border-gray-300 rounded w-full px-2 py-1"
                value={phone}
                onChange={handleInputPhone}
                />
          </div>

           <Button
              className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Registrar'
              onClick={register}
            />
 
        </div>
    
    </div>
  );
}
 
export default Register;