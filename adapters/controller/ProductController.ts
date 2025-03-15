import { Router, Request, Response } from "express";
import { ProductService } from "../../core/services/ProductService";
import { OrderDbService } from "../../core/services/DbAws/OrderDbService";
import { stat } from "fs";


export function createProductController(productService: ProductService, orderService: OrderDbService, postgresProduct: OrderDbService) {
    const router = Router();

    router.post("/products", async (req: Request, res: Response) => {
        // wait api

        const result = await postgresProduct.readOrder();
        res.status(201).send({ message: "Success", result: result });
        // const a = await orderService.addOrder({Order_id:req.body.Order_id,Order_name:req.body.Order_name});
        // res.status(201).send(a);
        // res.status(201).send({ message: "Product added", id: req.body.Order_id, name: req.body.Order_name });
    });

    router.get("/products", async (_req: Request, res: Response) => {
        // wait api 
        const result = await postgresProduct.readOrder().then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        })
        console.log("results :", result);
        res.status(200).send(result);
    });

    router.get(`/products/:id`, async (_req: Request, res: Response) => {

        const result = await postgresProduct.readOne(Number(_req.params.id)).then((res) => {

            return { "message": "Success", "statusCode": 200, "result": res }

        }).catch((err) => {
            // set error and error response 
            if (err == "error") return { "message": "Data is not number", "statusCode": 404 }
            if (err.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }

        });

        res.status(200).send(result);
    });

    router.get("/category/:category", async (_req: Request, res: Response) => {
        // wait api 
        try{
            switch (_req.params.category) {
                case "milktea":
                    _req.params.category = "Milk Tea";
                    break;
                case "fruittea":
                    _req.params.category = "Fruit Tea";
                    break;
                case "general":
                    _req.params.category = "General";
                    break;
                default:
    
                    throw Error("Data not found")
                    break;
                    
            }
            console.log('_req.params.category : ',_req.params.category)
            const result = await postgresProduct.readCatagory(_req.params.category).then((res) => {
                return { "message": "Success", "statusCode": 200, "result": res }
            }).catch((err) => {
                if (_req.params.catagory == undefined) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
            console.log("results :", result);
            res.status(200).send(result);
        }catch(err){
            
            res.status(404).send({ "message": "Data not found", "statusCode": 404 })
        }
        
        
        
    });




    return router;

}