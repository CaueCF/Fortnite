import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }
        if(!process.env.JWT_SECRET_KEY){
            throw new Error('JWT_SECRET_KEY must be defined')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send('Por favor, faça login!');
    }
}