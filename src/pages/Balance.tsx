import React, { useState, useEffect  } from "react";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import   Format  from '../components/Format';
import { useParams, useNavigate } from "react-router-dom";
import {ToastContainer,toast } from 'react-toastify';
import AccountService from "../services/account.service";
 
function Balance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<any>({});
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState(0);
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const success = () => toast("Recarga exitosa");
  const error = () => toast('La recarga no pudo ser exitosa, por favor intente nuevamente');


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
    if (id) getCustomer(id);
  }, [id])

  const validate = (data) => {
    let formErrors:any = {};
    if (data.document=='') formErrors.document = 'El documento de identidad es requerido';
    if (data.phone =='') formErrors.phone = 'El número de celular es requerido';
    if (data.amount =='') formErrors.amount = 'El monto a recargar es requerido';
    return formErrors;
  };
 
  const addMoney = () => {
    const data = {document, phone, amount };
    const formErrors = validate(data);
    if (Object.keys(formErrors).length === 0) {
    AccountService.addMoney(id,data)
      .then((response) => {
        console.log(response.data);
        success()
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

  const handleInputPhone = (event) => {
    setPhone(event.target.value);
  };

  const handleInputAmount = (event) => {
    setAmount(event.target.value);
  };
 
 
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Mi cuenta : <span className="font-bold text-sm mb-2 text-sky-900">{customer.name} {customer.lastName}</span></h4>
          <h1 className="font-bold text-sm mb-2 text-sky-900">Saldo disponible:</h1>
          <Format amount={customer.balance} currency="USD" />
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
               type="number"
               id="phone"
               name="phone"
               className="border border-gray-300 rounded w-full px-2 py-1"
               value={phone}
               onChange={handleInputPhone}
              />
               {errors.phone && <p className="text-red-500">{errors.phone}</p>}
          </div>
 
          <div className="mb-2">
            <label className="block mb-1 font-medium">Monto</label>
          
            <Input
               type="number"
               id="amount"
               name="amount"
               className="border border-gray-300 rounded w-full px-2 py-1"
               value={amount}
               onChange={handleInputAmount}
              />
               {errors.amount && <p className="text-red-500">{errors.amount}</p>}
          </div>

          <Button
            className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Recargar Saldo'
            onClick={addMoney}
            />
          <ToastContainer />  
        </div>
    </div>
  );
}
 
export default Balance;