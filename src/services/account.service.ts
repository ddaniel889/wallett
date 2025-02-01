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
 
const getCustomer = (id) => {
  return http.get(`/customer/${id}`);
};
 
const createAccount = (data) => {
  return http.post("/account", data);
};

const createPayment = (data) => {
  return http.post("/payment", data);
};
 
 
const addMoney = (id, data) => {
  return http.put(`/account/${id}`, data);
};
 

 
export default {
  getAll,
  getCustomer,
  createAccount,
  createPayment,
  addMoney
};