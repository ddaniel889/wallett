import axios from "axios";
 
const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
 
const getAll = () => {
  return http.get("/customer");
};
 
const getCustomer = (id:string) => {
  return http.get(`/customer/${id}`);
};
 
const createAccount = (data:string) => {
  return http.post("/customer", data);
};

const createPayment = (data:string) => {
  return http.post("/payment", data);
};
 
 
const addMoney = (id:string, data:string) => {
  return http.patch(`/customer/${id}`, data);
};
 

 
export default {
  getAll,
  getCustomer,
  createAccount,
  createPayment,
  addMoney
};