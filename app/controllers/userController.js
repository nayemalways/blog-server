import { UserLogin, UserRegistration } from "../../services/userServices.js";

 // User Registration
 export const Register = async (req, res) => {
   try {
      const result = await UserRegistration(req);
      res.json(result);
   }catch(e){
      res.json({status: "error", data: e.toString()});
   }
 };


 // User Login 
 export const Login = async (req, res) => {
   try{
      const result = await UserLogin(req);
      res.json(result);
   }catch(e){
      res.json({status: "Error", Error: e.toString()});
   }
 }

 