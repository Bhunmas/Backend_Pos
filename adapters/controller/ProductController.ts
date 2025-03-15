import { Router, Request, Response } from "express";
import { ProductService } from "../../core/services/ProductService";
import { OrderDbService } from "../../core/services/DbAws/OrderDbService";


export function createProductController(productService:ProductService,orderService:OrderDbService,postgresProduct:OrderDbService) {
    const router = Router();

    router.post("/products", async(req: Request, res: Response) => {
        // wait api
        
        const result = await postgresProduct.readOrder();
        res.status(201).send({message:"Success",result:result});
        // const a = await orderService.addOrder({Order_id:req.body.Order_id,Order_name:req.body.Order_name});
        // res.status(201).send(a);
        // res.status(201).send({ message: "Product added", id: req.body.Order_id, name: req.body.Order_name });
    });

    router.get("/products",async (_req: Request, res: Response) => {
        // wait api 
        const result = await postgresProduct.readOrder().then((res)=>{
            return {"message":"Success","statusCode":200,"result":res}
        })
        console.log("results :",result);
        res.status(200).send(result);
    });

    router.get(`/products/:id`,async (_req: Request, res: Response) => {

        const result = await postgresProduct.readOne(Number(_req.params.id)).then((res)=>{
            
            return {"message":"Success","statusCode":200,"result":res}
           
        }).catch((err) => {
            // set error and error response 
            if(err == "error") return {"message":"Data is not number","statusCode":404}
            if(err.rowCount<= 0) return {"message":"Data not found","statusCode":404}
            
        });
        
        res.status(200).send(result);
    });

    router.get("/catagory/:catagory",async (_req: Request, res: Response) => {
        // wait api 
        console.log("_req :",_req.params.catagory);
        if(_req.params.catagory == "milktea") _req.params.catagory = "Milk Tea";
        if(_req.params.catagory == "fruittea") _req.params.catagory = "Fruit Tea";
        if(_req.params.catagory == "general") _req.params.catagory = "General";

        const result = await postgresProduct.readCatagory(_req.params.catagory).then((res)=>{
            return {"message":"Success","statusCode":200,"result":res}
        }).catch((err)=>{
            if (_req.params.catagory == undefined) return {"message":"Data not found","statusCode":404}
            return {"message":"Data not found","statusCode":404}
        })
        console.log("results :",result);
        res.status(200).send(result);
    });




    return router;

}