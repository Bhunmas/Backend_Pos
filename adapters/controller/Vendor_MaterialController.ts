import {Route,Router,Request,Response,NextFunction} from 'express';
import { Vendor_MaterialService } from '../../core/services/DbAws/Vendor_MaterialService';
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";
export function createVendor_materialController(
    postgresVendorMaterialService:Vendor_MaterialService,
    authorizationService:AuthorizationService
){
    const router = Router();

    router.get('/vendor_material',authorizationService.authMiddleware.bind(authorizationService),async(req:Request,res:Response,next:NextFunction)=>{
        const result = await postgresVendorMaterialService.readAll().then((res)=>{
            return {message:'Success',statuscode:200,result:res}
        }).catch(()=>{
            return {message:'Data not found',status:404}
        })
        res.status(200).send(result)
    })

    return router;
}


