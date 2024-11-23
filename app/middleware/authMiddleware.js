import { DecodeToken } from "../utility/tokenUtility.js";

export const authVerify =  (req, res, next) => {
    const token = req.headers['token'];
    let Decoded = DecodeToken(token);

    if(Decoded === null){
        res.status(401).json({status: "Fail", message: "Unauthorized"});
    }else{
        let email = Decoded.email;
        let user_id = Decoded.User_id;
 
        req.headers.email = email;
        req.headers.user_id = user_id;

        next();
    }
};

