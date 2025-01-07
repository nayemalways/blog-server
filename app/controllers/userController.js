import { UserLogin, UserRegistration } from "../../services/userServices.js";

 // User Registration
 export const Register = async (req, res) => {
   const result = await UserRegistration(req);
   res.json(result);
 };


 // User Login 
 export const Login = async (req, res) => {
   const result = await UserLogin(req);
   res.json(result);
 }

 