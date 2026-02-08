import { IAuthorization } from "../../ports/utility/IAuthorization";
import { Request, Response, NextFunction } from "express";

export class AuthorizationService{
    private Request;private Response; private NextFunction;
    constructor(private authorizationResposity:IAuthorization){
        this.Request =Request;
        this.Response=Response;
        this.NextFunction= NextFunction;
    }

    authMiddleware(req:Request,res:Response,next:NextFunction){
        return this.authorizationResposity.authMiddleware(req,res,next)
    }
    generateToken(user: any,secertKey:string,expire:string): string {
        return this.authorizationResposity.generate({
      userId: user.id,
      email: user.email,
      
    },secertKey,
  expire);
  }
}