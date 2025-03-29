import { Router, Request, Response } from "express";
import { OrderDbService } from "../../core/services/DbAws/OrderDbService";
import { stat } from "fs";


export function createProductController( postgresProduct: OrderDbService) {
    const router = Router();

    // router.post("/products", async (req: Request, res: Response) => {
    //     // wait api

    //     const result = await postgresProduct.readOrder();
    //     res.status(201).send({ message: "Success", result: result });
    //     // const a = await orderService.addOrder({Order_id:req.body.Order_id,Order_name:req.body.Order_name});
    //     // res.status(201).send(a);
    //     // res.status(201).send({ message: "Product added", id: req.body.Order_id, name: req.body.Order_name });
    // });

    router.get("/products", async (_req: Request, res: Response) => {
        // wait api 
        const result = await postgresProduct.readOrder().then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        })
        console.log("results :", result);
        res.status(200).send(result);
    });

    router.get("/products/table", async (_req: Request, res: Response) => {
        // wait api 
        const result = await postgresProduct.readOrderTable().then((res) => {
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
        try {
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
            console.log('_req.params.category : ', _req.params.category)
            const result = await postgresProduct.readCatagory(_req.params.category).then((res) => {
                return { "message": "Success", "statusCode": 200, "result": res }
            }).catch((err) => {
                if (_req.params.catagory == undefined) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
            console.log("results :", result);
            res.status(200).send(result);
        } catch (err) {

            res.status(404).send({ "message": "Data not found", "statusCode": 404 })
        }



    });

    router.post("/create", async (_req: Request, res: Response) => {
        // wait api 
        
        const result = await postgresProduct.addOrder(
            {
                Order_id: _req.body.product_id,
                Order_name: _req.body.product_name,
                Order_price: _req.body.price,
                Order_category: _req.body.category,
                Order_active: true,
                Order_imageurl: null
            }).then((res) => {
                return { "message": "Success", "statusCode": 200, "result": res }
            })
        
        res.status(200).send(result);
    });

    router.patch("/update", async (_req: Request, res: Response) => {
        // wait api 
        console.log('_req :', _req.body)
        const result = await postgresProduct.updateOrder(
            {
                Order_id: _req.body.product_id,
                Order_name: _req.body.product_name,
                Order_price: _req.body.price,
                Order_category: _req.body.category,
                Order_active:  _req.body.active,
                Order_imageurl: null
            }).then((res) => {
                return { "message": "Success", "statusCode": 200}
            }).catch((res)=>{
                if(res.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
        console.log("results :", result);
        res.status(200).send(result);
     
    });

    router.patch("/active", async (_req: Request, res: Response) => {
        // wait api 
      
        const result = await postgresProduct.active(
            _req.body.Order_id).then((res) => {
                return { "message": "Success", "statusCode": 200 }
            }).catch((res)=>{
                if(res.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
        console.log("results :", result);
        res.status(200).send(result);
     
    });
    
    router.patch("/inactive", async (_req: Request, res: Response) => {
        // wait api 
      
        const result = await postgresProduct.inactive(
           _req.body.Order_id).then((res) => {
                return { "message": "Success", "statusCode": 200 }
            }).catch((res)=>{
                if(res.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
        console.log("results :", result);
        res.status(200).send(result);
     
    });





    return router;

}