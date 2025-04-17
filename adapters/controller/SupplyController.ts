import {Router,Request,Response} from 'express';


export function createSupplyController(postgresSupply:any){
    const router = Router();

    router.get('/suppliers',async(_req:Request,res:Response)=>{
        const result = await postgresSupply.read().then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        }).catch(()=>{
            return {message:'Data not found',status:404}
        });
        res.status(200).send(result);
    })
    
    router.post('/create',async(_req:Request,res:Response)=>{
        
        const result = await postgresSupply.create(_req.body).then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        })
        res.status(200).send({req:_req.body,result:result});

    })

    router.patch('/update',async(_req:Request,res:Response)=>{
        const result = await postgresSupply.create(_req.body).then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        })
        res.status(200).send({req:_req.body,result:result});
    })

    router.get(`/suppliers/:id`,async(_req:Request,res:Response)=>{
        const result = await postgresSupply.readById(_req.params.id).then((res)=>{
            return {message:'Success',statuscode:200,result:res};
        })
        res.status(200).send(result);
    })

    router.delete(`/delete/:id`,async(_req:Request,res:Response)=>{
        const result = await postgresSupply.delete(_req.params.id).then((res)=>{
            return {message:'Success',statuscode:200};
        })
        res.status(200).send(result);
    })
    return router;
    
    
}
