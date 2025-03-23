import {Router,Request,Response} from 'express';
import { TransactionService } from "../../core/services/DbAws/TransactionService";

export function createTransactionController(postgresTransactionService:TransactionService){
    const router = new Router();

    router.get('/transactions',async(_req:Request,res:Response)=>{
        const result =await postgresTransactionService.readAll().then((res)=>{
            return {"message":"success","status":"200","result":res}
        }).catch(()=>{
            return {"message":"error","status":"500"}
        });
        res.status(200).send(result);
    })

    return router
}