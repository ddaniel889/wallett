import React, { useState, useEffect  } from "react";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import Navbar from "../components/Navbar";
import {useNavigate } from "react-router-dom";
import {ToastContainer,toast } from 'react-toastify';
import AccountService from "../services/account.service";

 
function Confirm() {
  const id = localStorage.getItem('user')?.toString();
  const session = localStorage.getItem('session');
  const token = localStorage.getItem('token');
  const amount = localStorage.getItem('amount');
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>({});
  const [tokenUser, setTokenUser] = useState(0);
  const [errors, setErrors] = useState<any>({});
  const success = () => toast.success("El pago se ha realizado exitosamente");
  const error = () => toast.error('Error al realizar el pago, por favor intente nuevamente');


  const getCustomer = (id:string) => {
    AccountService.getCustomer(id)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  };
 
  useEffect(() => {
    if (!id){
      navigate('/');
    }else{
      getCustomer(id);
    } 
  }, [id])


  const validate = (data) => {
    let formErrors:any = {};
    if (data.tokenUser ==0) formErrors.tokenUser = 'El token es requerido';
    if (data.tokenUser != token) formErrors.tokenUser = 'El token ingresado es inválido, intente nuevamente';
    return formErrors;
  };
 
  const confirmPayment = () => {
    let data:any = {tokenUser};
    data.tokenUser = Number(tokenUser);
    const formErrors = validate(data);
    if (Object.keys(formErrors).length === 0) {
      let quantity = Number(amount);
      data = { ...data,amount:quantity,session:session};
      AccountService.createPayment(id,data)
      .then((response) => {
        console.log(response)
        console.log(response.data);
        if(response.data.status =='Failed' ){
          error();
        }else{
          success();
          setTimeout(() => {
           navigate('/balance');
          },1000)
        }
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

  const goPayment = () => {
    localStorage.removeItem('amount');
     navigate('/payment')
  };


  const handleInputToken = (event) => {
    setTokenUser(event.target.value);
  };


 
 
  return (
    <>
     <Navbar/>
    <div className="max-w-sm mx-auto my-8 p-4 bg-slate-100 rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Confirmación de pago : <span className="font-bold text-sm mb-2 text-stone-700">{customer.name} {customer.lastName}</span></h4>      
          <h1 className="font-bold my-4 text-sm mb-2 text-orange-800">Por favor ingrese el toke enviado a su correo para confirmar el pago</h1>
      
          <div className="mb-2">
            <label className="block mb-1 font-medium">Token</label>
          
            <Input
               type="number"
               id="tokenUser"
               name="tokenUser"
               className="border border-gray-300 rounded w-full px-2 py-1"
               value={tokenUser}
               onChange={handleInputToken}
              />
               {errors.tokenUser && <p className="text-red-500">{errors.tokenUser}</p>}
          </div>

          <Button
            className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Confirmar'
            onClick={confirmPayment}
            />

          <Button
            className="bg-red-600 ml-12  text-white px-3 py-1 rounded mt-2" label='Cancelar'
            onClick={goPayment}
            />  
          <ToastContainer />  
        </div>
    </div>
    </>
  );

}
 
export default Confirm;