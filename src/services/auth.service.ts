import axios from "axios";
 
const http = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});
 
const getAll = () => {
  return http.get("/customer");
};
 
const get = (id) => {
  return http.get(`/customer/${id}`);
};
 
const authUser = (data) => {
  return http.post("/customer", data);
};
 

 
export default {
  getAll,
  get,
  authUser,
 
};