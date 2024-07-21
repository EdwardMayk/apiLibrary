import {sign, verify} from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

const generateToken = (id: number) => {
    const jwt = sign({id}, JWT_SECRET,{
        expiresIn: '1d'
    }); 

    return jwt;
}

const verifyToken = (jwt: string) => {
    const isValid = verify(jwt, JWT_SECRET);
    return isValid;
}


export {generateToken, verifyToken};