import { Router, Request, Response } from "express";
import { SupplierOrderHistoryService } from '../../core/services/DbAws/SupplierOrderHistory';
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";

export function createSupplierOrderHistoryController(supplierOrderHistoryService:SupplierOrderHistoryService,authorizationService:AuthorizationService){
    const router = Router();
    router.get('/SupplierOrderHistory',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        const result = await supplierOrderHistoryService.readAll().then((res)=>{
            return {message:'Success',statuscode:200,result:res}
        })
        res.status(200).send(result);
    })

    router.post('/SupplierOrderHistory/create',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        console.log(_req.body)
        const result = await supplierOrderHistoryService.create(_req.body).then((res)=>{
            return {message:'Success',statuscode:200,result:res}
        })
        res.status(200).send(result);
    })

    router.get('/SupplierOrderHistory/:id',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        console.log( _req.params)
        const result = await supplierOrderHistoryService.readPagination(Number(_req.params.id)).then((res)=>{
            return {message:'Success',statuscode:200,result:res.rows,total:res.total,sizepaginationPage:res.sizepaginationPage,currentpage:res.currentpage}
        })
        res.status(200).send(result);
    })
    return router;
}