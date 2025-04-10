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


    return router;



}