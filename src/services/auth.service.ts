import axios from "axios";
 
const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
 
 
const authUser = (data:string) => {
  return http.post("/login", data);
};
 

 
export default {
  authUser,
};