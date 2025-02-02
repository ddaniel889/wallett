

import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Balance from "./pages/Balance";
import Payment from "./pages/Payment";


import { BrowserRouter } from 'react-router-dom' 

function App() {

  return (
    <BrowserRouter>
    <div>
      <div className="container mx-auto mt-8 px-4">
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/balance/:id" element={<Balance/>}/>
          <Route path="/payment" element={<Payment/>}/>
        </Routes>
      </div>
    </div>
  </BrowserRouter>
  )
}

export default App
