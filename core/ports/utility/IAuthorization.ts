import { Authorization } from "../../entites/utility/Authorization";
import { Request, Response, NextFunction } from "express";

export interface IAuthorization{

    
    authMiddleware(req: Request, res: Response, next: NextFunction):void;
    generate(payload: any): string;
}