import JWT from 'jsonwebtoken';

export const EncodeToken =   (email, User_id) => {
    try {
        const KEY = process.env.JWT_SECRET;
        const EXPIRES = {expiresIn: process.env.JWT_EXPIRATION_TIME};
        const PAYLOAD = {email: email, User_id: User_id};
       
        return JWT.sign(PAYLOAD, KEY, EXPIRES);
    }catch(error){
        console.log(error);
    }
};


export const DecodeToken = (token) => {
    try {
        return JWT.verify(token, process.env.JWT_SECRET);
    }catch(error){
        return null;
    }
};