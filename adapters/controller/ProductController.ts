import { Router, Request, Response } from "express";
import { ProductService } from "../../core/services/ProductService";
import { OrderDbService } from "../../core/services/DbAws/OrderDbService";


export function createProductController(productService:ProductService,orderService:OrderDbService) {
    const router = Router();

    router.post("/products", async(req: Request, res: Response) => {
        // wait api
        
        const a = await orderService.addOrder({Order_id:req.body.Order_id,Order_name:req.body.Order_name});
        res.status(201).send(a);
        // res.status(201).send({ message: "Product added", id: req.body.Order_id, name: req.body.Order_name });
    });

    router.get("/products",async (_req: Request, res: Response) => {
        // wait api 
        const result = await orderService.readOrder()
        console.log("results :",result);
        res.status(200).send(result);
    });

    router.get(`/products/:id`,async (_req: Request, res: Response) => {
        console.log(_req.params.id)
        const result = await orderService.readOne(Number(_req.params.id));
        res.status(200).send(result);
    });

    return router;

}