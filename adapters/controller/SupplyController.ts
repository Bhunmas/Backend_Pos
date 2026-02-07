import {Router,Request,Response} from 'express';
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";

export function createSupplyController(postgresSupply:any,authorizationService:AuthorizationService){
    const router = Router();

    router.get('/suppliers',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        const result = await postgresSupply.read().then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        }).catch(()=>{
            return {message:'Data not found',status:404}
        });
        res.status(200).send(result);
    })
    
    router.post('/create',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        
        const result = await postgresSupply.create(_req.body).then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        })
        res.status(200).send({req:_req.body,result:result});

    })

    router.patch('/update',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        const result = await postgresSupply.create(_req.body).then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        })
        res.status(200).send({req:_req.body,result:result});
    })

    router.get(`/suppliers/:id`,authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        const result = await postgresSupply.readById(_req.params.id).then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        })
        res.status(200).send(result);
    })

    router.delete(`/delete/:id`,authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        const result = await postgresSupply.delete(_req.params.id).then((res)=>{
            return {message:'Success',statuscode:200};
        })
        res.status(200).send(result);
    })
    return router;
    
    
}
