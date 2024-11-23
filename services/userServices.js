 import UserModel from "../app/model/userModel.js";
 import {EncodeToken} from "../app/utility/tokenUtility.js";

 export const UserRegistration = async (req) => {
   try {
      const reqBody = req.body;
      if(reqBody.email && reqBody.password && reqBody.firstName && reqBody.lastName && reqBody.phone && reqBody.img){
        const data = await UserModel.create(reqBody);
        return {status: "success", data: data}
      }else{
        return {status: "Uncomplete", messag: "Please input all data"};
      }
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