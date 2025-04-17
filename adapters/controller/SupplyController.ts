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
    
    router.post('/create',()=>{

    })

    router.patch('/update',()=>{

    })

    router.get(`/suppliers/:id`,()=>{

    })

    router.delete(`/delete/:id`,()=>{

    })
    return router;
    
    
}
