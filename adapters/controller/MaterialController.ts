import { Router, Request, Response } from "express";
import { MaterialService } from "../../core/services/DbAws/MaterialService";

export function  createMaterialController(postgresMaterial:MaterialService){
    const router = Router();
    router.get("/materials",async (_req: Request, res: Response) => {

        const result = await postgresMaterial.readAll().then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        });
        res.status(200).send(result);
    });

    router.get("/materials/table", (_req: Request, res: Response) => {
    });

    router.get("/category/:category",async (_req: Request, res: Response) => {
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
    router.post("/create", async (_req: Request, res: Response) => {
        const result = await postgresMaterial.create(_req.body).then((res)=>{
            return { "message": "Success", "statusCode": 200 }
        });
        res.status(200).send(result);
    });
    router.patch("/update", async(_req: Request, res: Response) => {
        const result = await postgresMaterial.update(_req.body).then((res)=>{
            return { "message": "Success", "statusCode": 200 }
        });
        res.status(200).send(result);
    });





    return router;



}