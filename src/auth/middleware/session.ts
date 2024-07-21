import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { verifyToken } from "../jwt/jwt.handle";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const jwtByUser = req.headers.authorization || '';
        
        const jwt = jwtByUser.split(' ').pop() || '';

        const isValid = verifyToken(jwt);

        if (!isValid) {
            res.status(401);
            res.send({message: 'Unauthorized'});
            return;
        }

        req.body.jwt = jwt;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
};



export default checkJwt;