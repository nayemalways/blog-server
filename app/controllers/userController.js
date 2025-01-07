import { UserLogin, UserRegistration } from "../../services/userServices.js";

 // User Registration
 export const Register = async (req, res) => {
   const result = await UserRegistration(req);
   res.json(result);
 };


 // User Login 
 export const Login = async (req, res) => {
   const result = await UserLogin(req);

   // User AUTH token set to cookie
   const cookieOptions = {expires: new Date(Date.now() + 24*60*60*1000), httpOnly: false};
   res.cookie('token', result['Token'], cookieOptions);

   res.json(result);
 }

 