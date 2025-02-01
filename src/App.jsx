

import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Balance from "./pages/Balance";
import Payment from "./pages/Payment";
import { BrowserRouter } from 'react-router-dom' 

function App() {
  //onst [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div>
      {/* NAVBAR */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="flex space-x-4">
         {/* <Link to="/tutorials" className="hover:text-gray-300 font-bold">
            Tutorials
          </Link>
          <Link to="/add" className="hover:text-gray-300">
            Add
          </Link> */} 
          <Link to="/" className="hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="hover:text-gray-300">
            Registro
          </Link>
          <Link to="/balance/:id" className="hover:text-gray-300">
            Recarga
          </Link>
          <Link to="/payment" className="hover:text-gray-300">
            Pagos
          </Link>
        </div>
      </nav>

      {/* ROUTES */}
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
