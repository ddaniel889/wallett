import React, { useState } from "react";
import { Link } from "react-router-dom";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import AuthService from "../services/auth.service";
 
export default function Login() {
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const notFound = () => toast.error('Datos inválidos, por favor intente nuevamente');
  const error = () => toast.error('La operación no pudo ser realizada, por favor intente nuevamente');
  const [errors, setErrors] = useState<any>({});

  const validate = (data) => {
    let formErrors:any = {};
    if (data.document=='') formErrors.document = 'El documento de identidad es requerido';
    if (data.phone =='') formErrors.phone = 'El número de celular es requerido';
    return formErrors;
  };
 
  const login = () => {
    const data = { document, phone};
    const formErrors = validate(data);
    setSubmitted(true);
    if (Object.keys(formErrors).length === 0) {
      AuthService.authUser(data)
      .then((response) => {
        console.log(response)
        let user = response.data[0]._id;
        let message = response.data;
        if(message.length > 0){
          navigate(`/balance/${user}`);
        }else{
          notFound();
        }
      })
      .catch((e) => {
        console.log(e);
        if(e.code){
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


  const handleInputPhone = (event) => {
    setPhone(event.target.value);
  };
 
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Wallet </h4>

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
            <label className="block mb-1 font-medium">Teléfono</label>
           <Input
              type="text"
              id="phone"
              name="phone"
              className="border border-gray-300 rounded w-full px-2 py-1"
              value={phone}
              onChange={handleInputPhone}
            />
             {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
          <Button
            className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Ingresar'
            onClick={login}
          />
          <div className="mt-1.5">
          <Link to="/register" className="font-medium text-amber-900  text-sm">
             Registrate
          </Link>
          <ToastContainer />
          </div>
        </div>
   
    </div>
  );
}
 
