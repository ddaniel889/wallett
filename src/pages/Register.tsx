import React, { useState } from "react";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import { Link } from "react-router-dom";
import AccountService from "../services/account.service";
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
 
function Register() {
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();
  const success = () => toast.success("El usuario se ha registrado");
  const error = () => toast.error('No se pudo registrar el usuario, por favor intente nuevamente');

  const validate = (data) => {
    let formErrors:any = {};
    if (data.document=='') formErrors.document = 'El documento de identidad es requerido';
    if (data.name =='') formErrors.name = 'El nombre es requerido';
    if (data.email =='') {
      formErrors.email = 'Email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formErrors.email = 'Debe ingresar un email válido';
    }
    if (data.lastName =='') formErrors.lastName = 'El apellido es requerido';
    if (data.phone =='') formErrors.phone = 'El número de celular es requerido';
    return formErrors;
  };
 
  const register = () => {
    const form:any = { document, name, email,lastName, phone };
    const formErrors = validate(form);
    if (Object.keys(formErrors).length === 0) {
      const phone = Number(form.phone);
      form.phone= phone;
       AccountService.createAccount(form)
      .then((response) => {
        console.log(response);
        const user = response.data.data._id;
        const session = response.data.session;
        localStorage.setItem("session",session);
        localStorage.setItem("user",user);
        success()
        setTimeout(() => {
           navigate('/balance')
        },1000)
      })
      .catch((e) => {
        console.log(e);
        if(e){
          error();
        }
      });
     
    } else {
      setErrors(formErrors);
    }
 
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
    <div className="max-w-sm mx-auto p-4 bg-slate-100 rounded shadow">
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
                {errors.document && <p className="text-red-500">{errors.document}</p>}
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
                 {errors.name && <p className="text-red-500">{errors.name}</p>}
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
                 {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
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
                {errors.email && <p className="text-red-500">{errors.email}</p>}
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
                 {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>

           <Button
              className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Registrar'
              onClick={register}
            />
              <div className="mt-1.5">
          <Link to="/" className="font-medium text-amber-900  text-sm">
             Volver
          </Link>
          <ToastContainer />
          </div>
 
          <ToastContainer />
        </div>
    
    </div>
  );
}
 
export default Register;