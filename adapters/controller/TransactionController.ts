import {Router,Request,Response} from 'express';


export function createTransactionController(){
    const router = new Router();

    router.get('/transactions',(_req:Request,res:Response)=>{
        const result = 
        res.status(200).send({"message":"","status":200,});
    })

    return router
}