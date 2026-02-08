import { Authorization } from "../../core/entites/utility/Authorization";
import { IAuthorization } from "../../core/ports/utility/IAuthorization";
import { DateTime } from 'luxon';
import { Request, Response, NextFunction } from "express";
import jwt,{ SignOptions } from "jsonwebtoken";

export class AuthorizationAdapter {
    private secretKey;
    private expireTime;
    private refreshKey;
   
    
    constructor(secretKey:string,expireTime:string){
        this.secretKey = secretKey;
        this.expireTime = expireTime;
    }

    generate(payload: any,secertKey:string,expire:string):string{
         const option : SignOptions = {
            expiresIn:expire == "refreshToken"?"1d":"1h"
        }
     
        console.log("req:",payload)
        const token = jwt.sign(payload,secertKey,option);
        return  token
    }

    authMiddleware(req: Request,res: Response,next: NextFunction):void{
     
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "No token" });
        }
        try{
            const token = authHeader.split(" ")[1];
            console.log('token :',token)
            const payload = jwt.verify(token,this.secretKey);
            (req as any).user = payload;
            next();
            
        }catch{
            return res.status(401).json({ message: "Invalid token" })
        }
    
    }

}