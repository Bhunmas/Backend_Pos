import { Router, Request, Response } from "express";
import { EmployeeService } from "../../core/services/DbAws/EmployeeService"
import { Employee } from '../../core/entites/DbAws/Employee';
export function createEmployeeController(postgresEmployee:EmployeeService){
    const router = Router();
    router.get("/employees",async(_req:Request,res:Response)=>{
        const result = await postgresEmployee.readAll().then((result)=>{
            return {"message":"Success","statuscode":200,"result":result}
        }).catch((err)=>{
            return {"message":"Data not found","statuscode":404}
        });
        res.status(200).send(result);
    })
    // per employee id
    router.get(`/employees/:id`,async(_req:Request,res:Response)=>{
        console.log("id ",_req.params.id);
        const result = await postgresEmployee.readOne(Number(_req.params.id)).then((res)=>{
            return {"message":"Success","statuscode":200,"result":res}
        }).catch((err)=>{
            return {"message":"Data not found","statuscode":404}
        });
        res.status(200).send(result);
    }) 
    // create employee
    router.post(`/create`,(_req:Request,res:Response)=>{
        const request:Employee = new Employee(_req.body.Employee_id,_req.body.Employee_name);
        const result = postgresEmployee.
        res.status(200).send({"message":"Hello World"});
    }) 
    // update employee
    router.patch(`/update`,(_req:Request,res:Response)=>{
        res.status(200).send({"message":"Hello World"});
    }) 
    
    // active and inactive employee
    router.patch(`/active`,(_req:Request,res:Response)=>{
        res.status(200).send({"message":"Hello World"});
    }) 

    router.patch(`/inactive`,(_req:Request,res:Response)=>{
        res.status(200).send({"message":"Hello World"});
    }) 
    

    return router
}