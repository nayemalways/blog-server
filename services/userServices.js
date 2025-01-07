 import bcrypt from 'bcrypt';

 import UserModel from "../app/model/userModel.js";
 import {EncodeToken} from "../app/utility/tokenUtility.js";



 
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
    return {status: "success", data: data}
 
   }catch(e){
      return {status: "Error", message: e.toString()}
   }
 };


 export const UserLogin = async (req) => {
    try {
        const reqBody = req.body;
        const login = await UserModel.aggregate([
            {
                $match: reqBody
            },
            {
                $project: {
                    _id: 1,
                    email: 1
                }
            }
        ]);
        
        if(!login || login.length === 0){
            return {status: "failed", message: "email or password worng!"};
        }else{
            const email = login[0]['email'];
            const id = login[0]['_id'];
            const token =  EncodeToken(email, id);
            return {status: "success", message: "Login success", Token: token};
        }
    }catch(e){
        return {status: "Error", error: e.toString()}
    }
 }