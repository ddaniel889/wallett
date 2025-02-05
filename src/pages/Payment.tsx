import React, { useState,useEffect } from "react";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import Navbar from "../components/Navbar";
import  Format  from '../components/Format';
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import AccountService from "../services/account.service";
 
function Payment() {
  const navigate = useNavigate();
  const id = localStorage.getItem('user');
  const session = localStorage.getItem("session");
  const [customer, setCustomer] = useState<any>({});
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [errors, setErrors] = useState<any>({});
 


  const generateNumericToken = () => {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const getCustomer = (id:string) => {
      AccountService.getCustomer(id)
          .then((response) => {
            setCustomer(response.data);
            setBalance(response.data.balance);
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
    if (data.concept=='') formErrors.concept = 'El concepto de la compra a pagar es requerido';
    if (data.amount ==0) formErrors.amount = 'El monto de la compra es requerido';
    if (data.amount > data.balance) formErrors.amount = 'El monto de la compra supera el saldo disponible, por favor debe recargar la cuenta';
    return formErrors;
  };
 
  const payPurchase = () => {
    let data:any = { concept, amount,balance };
    const formErrors = validate(data);
    if (Object.keys(formErrors).length === 0) {
      const amount = Number(data.amount);
      localStorage.setItem("amount",amount.toString());
      const token = generateNumericToken();
      localStorage.setItem("token",token.toString());
      data = { ...data,amount:amount ,token: token, user: id, session:session };
      AccountService.sendMessage(data)
      .then((response) => {
        console.log(response.data);
        navigate('/confirm');
      })
      .catch((e) => {
        console.log(e);
      });
    } else {
      setErrors(formErrors);
    }
  };

  const handleInputConcept = (event) => {
    setConcept(event.target.value);
  };

  const handleInputAmount = (event) => {
    setAmount(event.target.value);
  };
 
  return (
    <>
     <Navbar />
    <div className="max-w-sm mx-auto my-8 p-4 bg-slate-100 rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Pagos</h4>
           <h1 className="font-bold text-sm mb-2 text-stone-700">Saldo disponible:</h1>
          {customer.balance && <Format amount={customer.balance} currency="USD" />}
          <div className="mb-2">
            <label className="block mb-1 font-medium">Concepto</label>
             <Input
              type="text"
              id="concept"
              name="concept"
              className="border border-gray-300 rounded w-full px-2 py-1"
              value={concept}
              onChange={handleInputConcept}
              />
               {errors.concept && <p className="text-red-500">{errors.concept}</p>}
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

           <Button className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Pagar' onClick={payPurchase}/>
           <ToastContainer />
        </div>
 
    </div>
    </>
  );
}
 
export default Payment;