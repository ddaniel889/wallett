import React, { useState } from "react";
import   Button from '../components/Button';
import   Input  from '../components/Input';
import { toast } from 'react-toastify';
import AccountService from "../services/account.service";
 
function Register() {
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
 
  const payment = () => {
    const data = { concept, amount };
    AccountService.create(data)
      .then((response) => {
        console.log(response.data);
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputConcept = (event) => {
    setConcept(event.target.value);
  };

  const handleInputAmount = (event) => {
    setAmount(event.target.value);
  };
 
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
        <div>
          <h4 className="font-bold text-xl mb-2 text-cyan-700">Pagos</h4>
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
          </div>

           <Button className="bg-cyan-400 text-white px-3 py-1 rounded mt-2" label='Pagar' onClick={payment}/>
          
        </div>
 
    </div>
  );
}
 
export default Register;