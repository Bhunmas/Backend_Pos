import {Route,Router,Request,Response,NextFunction} from 'express';
import { Vendor_MaterialService } from '../../core/services/DbAws/Vendor_MaterialService';
export function createVendor_materialController(
    postgresVendorMaterialService:Vendor_MaterialService
){
    const router = Router();

    router.get('/vendor_material',async(req:Request,res:Response,next:NextFunction)=>{
        const result = await postgresVendorMaterialService.readAll().then((res)=>{
            return {message:'Success',statuscode:200,result:res}
        }).catch(()=>{
            return {message:'Data not found',status:404}
        })
        res.status(200).send(result)
    })

    return router;
}


