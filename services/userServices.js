 import bcrypt from 'bcrypt';

 import UserModel from "../app/model/userModel.js";
 import {EncodeToken} from "../app/utility/tokenUtility.js";
import SendEmail from '../app/utility/EmailSender.js';



// User Sign up
 export const UserRegistration = async (req) => {
   try {
    const {email, password, firstName, lastName, phone, img} = req.body;

    // Hasing user's password for better security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Ready of Registration
    const userData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        phone,
        img
    }


    // Send data to DB for User Registrations
    const data = await UserModel.create(userData);
    return {status: "success", message: 'Registration success!'}
 
   }catch(e){
      return {status: "Error", message: e.toString()}
   }
 };


 // User login
 export const UserLogin = async (req) => {
    try {

        const {email, password} = req.body;
        const login = await UserModel.find({email}); // Search user
        if(!login || login.length === 0) return {status: "failed", message: "User not found"};

        // Check password are matched
        const isPasswordMatch = await bcrypt.compare(password, login[0]['password']); // Compare password between hashed password
        if(isPasswordMatch === false) return {status: "fail", message: "Password doesn't match"};

        // Encode user Id and email in JWT
        const id = login[0]['_id'];
        const token =  EncodeToken(email, id);

        // Final result
        return {status: "success", Token: token};

    }catch(e){
        return {status: "Error", error: e.toString()}
    }
 }


 // Forget password
 export const forgetPasswordService = async (req) => {
    try {
        const { email } = req.body;
        const search__user = await UserModel.find({email});
        
        // Check user found or not
        if(search__user.length === 0) {
            return {status: "fail", message: "No user found"};
        }

        // Generate Six digit random number (OTP)
        const otp = Math.floor( 100000 + Math.random() * 999999);
        const EmailTo = search__user[0]['email'];
        const EmailText = '';
        const EmailSubject = 'Password Reset Request for Blog App';
        const EmailHTMLBody = `
                    <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                            }
                            .email-container {
                            max-width: 600px;
                            margin: 20px auto;
                            background: #ffffff;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                            background-color: #007bff;
                            color: white;
                            text-align: center;
                            padding: 20px;
                            }
                            .header h1 {
                            margin: 0;
                            font-size: 24px;
                            }
                            .content {
                            padding: 20px;
                            color: #333;
                            }
                            .content h2 {
                            color: #007bff;
                            }
                            .content p {
                            margin: 10px 0;
                            line-height: 1.5;
                            }
                            .otp {
                            font-size: 24px;
                            font-weight: bold;
                            color: #333;
                            text-align: center;
                            margin: 20px 0;
                            background-color: #f8f9fa;
                            padding: 10px;
                            border: 1px dashed #007bff;
                            border-radius: 5px;
                            }
                            .btn {
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: #007bff;
                            color: white;
                            text-decoration: none;
                            border-radius: 5px;
                            text-align: center;
                            margin: 20px auto;
                            display: block;
                            width: fit-content;
                            }
                            .footer {
                            text-align: center;
                            font-size: 12px;
                            color: #777;
                            padding: 10px;
                            background-color: #f4f4f4;
                            }
                        </style>
                        </head>
                        <body>
                        <div class="email-container">
                            <div class="header">
                            <h1>Blog App</h1>
                            </div>
                            <div class="content">
                            <h2>Password Reset Request</h2>
                            <p>Hi ${search__user[0]['firstName']},</p>
                            <p>We received a request to reset your password for your Blog App account. Please use the following OTP (One-Time Password) to proceed:</p>
                            <div class="otp">${otp}</div>
                            <p>This OTP is valid for the next <strong>10 minutes</strong>. If you did not request this reset, you can safely ignore this email.</p>
                            <a href="[Reset Password Link]" class="btn">Reset Password</a>
                            <p>If you have any questions or need help, feel free to contact our support team.</p>
                            </div>
                            <div class="footer">
                            <p>&copy; 2025 Blog App. All rights reserved.</p>
                            </div>
                        </div>
                        </body>
                        </html>

        `;


        // Send Otp to user's email
        const email__send = await SendEmail(EmailTo, EmailText, EmailSubject, EmailHTMLBody);
        if(!email__send) {
            return {status: "fail", message: "Email couldn't be sent"}
        }


        // Update Otp code in the Database
        await UserModel.updateOne({email}, {otp});
        // Final result
        return {status: "success", message: " A six digit otp has been sent"};


    }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error"};
    }
 }

 // OTP verification
 export const OtpVerifyService = async (req) => {
    try {

        const {email, otp} = req.params;
        // Filter user using email and otp
        const data = await UserModel.aggregate([
           {
            $match: {email: email, otp: otp}
           }
        ])
        

        // If otp match or not. If otp doesn't matched the data.length will be zero
        if (data.length === 0) {
           return {status: "fail", message: "Otp doesn't matched"};
          }

        // Final result
        return {status: "Success", message: "Verification successful"};

    }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error"}
    }
 }


export const ResetPasswordService = async (req) => {
    try {

        const {email, otp, password} = req.body;
        const Search_User = await UserModel.find({email, otp}); // Search user


        if(Search_User.length === 0 || Search_User === null) {
            return {status: "fail", message: "User unauthorized"};
        }

        
        let saltRounds  = 10; // Salt Rounds
        const hashPassword = await bcrypt.hash(password, saltRounds); // Generate Hash Password      
        const updatePassword = await UserModel.updateOne({email}, {
            otp: "0",
            password: hashPassword
        }); // Update Password


        if(updatePassword.modifiedCount === 0){
            return {status: "fail", message: "Password reset failed"};
        }

        // Final result
        return {status: "Success", message: "Password reset successful"};

    }catch(e) {
        console.log(e.toString());
        return {status: "Error", message: "Internal server error"}
    }
 }