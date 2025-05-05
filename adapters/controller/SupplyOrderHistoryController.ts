import { Router, Request, Response } from "express";
import { SupplierOrderHistoryService } from '../../core/services/DbAws/SupplierOrderHistory';


export function createSupplierOrderHistoryController(supplierOrderHistoryService:SupplierOrderHistoryService){
    const router = Router();
    router.get('/SupplierOrderHistory',async(_req:Request,res:Response)=>{
        const result = await supplierOrderHistoryService.readAll().then((res)=>{
            return {message:'Success',statuscode:200,result:res}
        })
        res.status(200).send(result);
    })

    router.post('/SupplierOrderHistory/create',async(_req:Request,res:Response)=>{
        console.log(_req.body)
        const result = await supplierOrderHistoryService.create(_req.body).then((res)=>{
            return {message:'Success',statuscode:200,result:res}
        })
        res.status(200).send(result);
    })

    router.get('/SupplierOrderHistory/:id',async(_req:Request,res:Response)=>{
        console.log( _req.params)
        const result = await supplierOrderHistoryService.readPagination(Number(_req.params.id)).then((res)=>{
            return {message:'Success',statuscode:200,result:res.rows,total:res.total,sizepaginationPage:res.sizepaginationPage,currentpage:res.currentpage}
        })
        res.status(200).send(result);
    })
    return router;
}