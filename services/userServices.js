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
        const {email, password} = req.body;


        const login = await UserModel.find({email});
        
        if(!login || login.length === 0){
            return {status: "failed", message: "User not found"};
        } 

        // Checke password are matched in
        const isPasswordMatch = await bcrypt.compare(password, login[0]['password']);
        if(isPasswordMatch === false) {
            return {status: "fail", message: "Password doesn't match"};
        }

        // Encode user Id and email in JWT
        const id = login[0]['_id'];
        const token =  EncodeToken(email, id);

        // Final result
        return {status: "success", Token: token};

    }catch(e){
        return {status: "Error", error: e.toString()}
    }
 }