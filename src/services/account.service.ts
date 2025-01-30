import axios from "axios";
 
const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
 
const getAll = () => {
  return http.get("/tutorials");
};
 
const get = (id) => {
  return http.get(`/tutorials/${id}`);
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
  get,
  createAccount,
  createPayment,
  addMoney
 
};