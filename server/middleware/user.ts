import {User} from './model/user'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {Request,Response,NextFunction,RequestHandler} from 'express'
import dotenv from 'dotenv'
dotenv.config({})


declare module 'express' {
    interface Request {
      user?: any; // Replace 'any' with the actual type of your user object
    }
  }



export const isAuthenticated:RequestHandler = async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const { authorization } = req.headers;
if (!authorization) {
  return res.status(401).json({ message: 'Authorization header missing' });
}
       
const [scheme, token] = authorization.split(' ');
if (scheme !== 'Bearer' || !token) {
  return res.status(401).json({ message: 'Invalid Authorization header' });
}

        
        
     if(!token){
        return res.status(401).json({
            message:"Please Login First",
        });


     }
    const decoded  = await jwt.verify(token,process.env.JWT_SECRET_KEY!) as JwtPayload

    req.user=await User.findOne({email:decoded.email})
    next();
        
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }
}
