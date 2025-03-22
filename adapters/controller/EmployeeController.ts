import { Router, Request, Response } from "express";
import { EmployeeService } from "../../core/services/DbAws/EmployeeService"
export function createEmployeeController(postgresEmployee:EmployeeService){
    const router = Router();
    router.get("/",(_req:Request,res:Response)=>{
        res.status(200).send({"message":"Hello World"});
    })
    return router
}