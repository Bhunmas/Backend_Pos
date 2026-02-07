import { Authorization } from "../../core/entites/utility/Authorization";
import { IAuthorization } from "../../core/ports/utility/IAuthorization";
import { DateTime } from 'luxon';
import { Request, Response, NextFunction } from "express";
import jwt,{ SignOptions } from "jsonwebtoken";

export class AuthorizationAdapter {
    private secretkey;
    private expireTime;
    constructor(secretkey:string,expireTime:string){
        this.secretkey = secretkey;
        this.expireTime = expireTime;
    }

    generate(payload: any):string{
         const option : SignOptions = {
            expiresIn:"1h"
        }
        console.log("req:",payload)
        const token = jwt.sign(payload,this.secretkey,option);
      
        return  token
    }

    authMiddleware(req: Request,res: Response,next: NextFunction):void{
     
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token" });
        }
        try{
            const token = authHeader.split(" ")[1];
            console.log('token ',authHeader)
            const payload = jwt.verify(token,this.secretkey);
            (req as any).user = payload;
            next();
            
        }catch{
            return res.status(401).json({ message: "Invalid token" })
        }
    
    }

}