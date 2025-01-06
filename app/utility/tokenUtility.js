import JWT from 'jsonwebtoken';
import { JWT_EXPIRATION_TIME, JWT_SECRET } from './../config/config.js';


export const EncodeToken =   (email, User_id) => {
    try {
        const KEY =  JWT_SECRET;
        const EXPIRES = {expiresIn: JWT_EXPIRATION_TIME};
        const PAYLOAD = {email: email, User_id: User_id};
       
        return JWT.sign(PAYLOAD, KEY, EXPIRES);
    }catch(error){
        console.log(error);
    }
};


export const DecodeToken = (token) => {
    try {
        return JWT.verify(token, JWT_SECRET);
    }catch(error){
        return null;
    }
};