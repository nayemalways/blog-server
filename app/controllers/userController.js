import { 
  forgetPasswordService, 
  myBlogService, 
  OtpVerifyService, 
  ResetPasswordService, 
  UserLogin, 
  UserRegistration } from "../../services/userServices.js";

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


 // User's all blog
 export const userBlog = async (req, res) => {
  const result = await myBlogService(req);
  res.json(result);
 }


 // If Forget password send OTP
 export const forgetPassword = async (req, res) => {
   const result = await forgetPasswordService(req);
   res.json(result);
 };


 // User's given OTP matching
 export const OtpVerify = async (req, res) => {
  const result = await OtpVerifyService(req);
  res.json(result);
 }


 // Reset password
 export const ResetPassword = async (req, res) => {
  const result = await ResetPasswordService(req);
  res.json(result);
 }