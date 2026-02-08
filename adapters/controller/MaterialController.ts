import { Router, Request, Response } from "express";
import { MaterialService } from "../../core/services/DbAws/MaterialService";
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";
export function  createMaterialController(postgresMaterial:MaterialService,authorizationService:AuthorizationService){
    const router = Router();
    router.get("/materials",authorizationService.authMiddleware.bind(authorizationService),async (_req: Request, res: Response) => {

        const result = await postgresMaterial.readAll().then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        });
        res.status(200).send(result);
    }); 

    router.get("/materials/table",authorizationService.authMiddleware.bind(authorizationService), (_req: Request, res: Response) => {
    });

    router.get("/materials/:id",authorizationService.authMiddleware.bind(authorizationService),async (_req: Request, res: Response) => {

        const result = await postgresMaterial.readById(Number(_req.params.id)).then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        });
        res.status(200).send(result);
    });



    router.get("/category/:category",authorizationService.authMiddleware.bind(authorizationService),async (_req: Request, res: Response) => {
        try{
            switch(_req.params.category){
                case "Tea":
                    _req.params.category = "ชา";
                    break;
                case "General":
                    _req.params.category = "ทั่วไป";
                    break;
                case "Sauce":
                    _req.params.category = "ซอส";
                    break;
                default:
                    throw Error("Data not found")
                    break;
                
            }

            const result = await postgresMaterial.readCategory(_req.params.category).then((res) => {
                return { "message": "Success", "statusCode": 200, "result": res }
            })
            res.status(200).send(result);
            
        }
        catch(error){

        }
    });
    router.post("/create",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        console.log("create",_req.body)
        const result = await postgresMaterial.create(_req.body).then((res)=>{
            return { "message": "Success", "statusCode": 200 }
        });
        res.status(200).send(result);
    });
    router.patch("/update",authorizationService.authMiddleware.bind(authorizationService), async(_req: Request, res: Response) => {
        console.log('req',_req.body)
        const result = await postgresMaterial.update(_req.body).then((res)=>{
            return { "message": "Success", "statusCode": 200 }
        });
        res.status(200).send(result);
    });

    router.delete(`/delete/:id`,authorizationService.authMiddleware.bind(authorizationService), async(_req: Request, res: Response) => {
        const result = await postgresMaterial.delete(_req.params.id).then((res)=>{
            return { "message": "Success", "statusCode": 200 }
        });
        res.status(200).send(result);
    });

    





    return router;



}