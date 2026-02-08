import { Router, Request, Response } from "express";
import { OrderDbService } from "../../core/services/DbAws/OrderDbService";
import { stat } from "fs";
import { OrderDb } from "../../core/entites/DbAws/OrderDb";
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";

export function createProductController( postgresProduct: OrderDbService,authorizationService:AuthorizationService) {
    const router = Router();

    // router.post("/products", async (req: Request, res: Response) => {
    //     // wait api

    //     const result = await postgresProduct.readOrder();
    //     res.status(201).send({ message: "Success", result: result });
    //     // const a = await orderService.addOrder({Order_id:req.body.Order_id,Order_name:req.body.Order_name});
    //     // res.status(201).send(a);
    //     // res.status(201).send({ message: "Product added", id: req.body.Order_id, name: req.body.Order_name });
    // });

    router.get("/products",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        // wait api 
        const result = await postgresProduct.readOrder().then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        })
  
        res.status(200).send(result);
    });

    router.get("/products/table",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        // wait api 
        const result = await postgresProduct.readOrderTable().then((res) => {
            return { "message": "Success", "statusCode": 200, "result": res }
        })
        
        res.status(200).send(result);
    });

    // router.get(`/products/:id`, async (_req: Request, res: Response) => {

    //     const result = await postgresProduct.readOne(Number(_req.params.id)).then((res) => {

    //         return { "message": "Success", "statusCode": 200, "result": res }

    //     }).catch((err) => {
    //         // set error and error response 
    //         if (err == "error") return { "message": "Data is not number", "statusCode": 404 }
    //         if (err.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }

    //     });

    //     res.status(200).send(result);
    // });

    router.get("/category/:category",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
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

    router.post("/create",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        // wait api 
        console.log('_req',_req.body)
        const result = await postgresProduct.addOrder(
            {
                product_id:null,
                product_name: _req.body.product_name,
                product_price: _req.body.product_price,
                product_category: _req.body.product_category,
                product_active: true,
                product_imageurl:_req.body.product_imageurl
            }).then((res) => {
                return { "message": "Success", "statusCode": 200, "result": res }
            })
        
        res.status(200).send(result);
    });

    router.patch("/update",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        // wait api 
        const req:OrderDb = new OrderDb(_req.body.Order_id, _req.body.Order_name, _req.body.Order_price,_req.body.Order_category, _req.body.Order_active, null   ); 
        console.log('_req :', _req.body)
        const result = await postgresProduct.updateOrder(
            {
                product_id: _req.body.product_id,
                product_name: _req.body.product_name,
                product_price: _req.body.product_price,
                product_category: _req.body.product_category,
                product_active: _req.body.product_active,
                product_imageurl: "dsad"
            }).then((res) => {
                return { "message": "Success", "statusCode": 200}
            }).catch((res)=>{
                console.log('res',res);
                if(res.errorcode == 10001) return { "message": res.result+" is null", "statusCode": 404 }
                if(res.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
        console.log("results :", result);
        res.status(200).send(result);
     
    });

    router.patch("/active",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        // wait api 
      
        const result = await postgresProduct.active(
            _req.body.product_id).then((res) => {
                return { "message": "Success", "statusCode": 200 }
            }).catch((res)=>{
                if(res.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
        console.log("results :", result);
        res.status(200).send(result);
     
    });
    
    router.patch("/inactive",authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
        // wait api 
      
        const result = await postgresProduct.inactive(
           _req.body.product_id).then((res) => {
                return { "message": "Success", "statusCode": 200 }
            }).catch((res)=>{
                if(res.rowCount <= 0) return { "message": "Data not found", "statusCode": 404 }
                return { "message": "Data not found", "statusCode": 404 }
            })
        console.log("results :", result);
        res.status(200).send(result);
     
    });


    router.delete(`/delete/:id`,authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        const result = await postgresProduct.delete(_req.params.id).then((res)=>{
            return { "message": "Success", "statusCode": 200 };
        })
        res.status(200).send(result);
    })


     router.get('/products/:id',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
        console.log( _req.params)
     
        try{
            const result = await postgresProduct.readOne(Number(_req.params.id))
            res.status(200).send(result);
        }
        catch (err: any) {
            console.log("err",err)
        if (err.errorcode === 10) {
             res.status(404).json({ message: err.message });
        }
         res.status(404).json({ message: "item don't exist " });
       
        
    }
       
    })
    // router.get('/products/:id',authorizationService.authMiddleware.bind(authorizationService),async(_req:Request,res:Response)=>{
    //     console.log( _req.params)
    //     const result = await postgresProduct.readPagination(Number(_req.params.id)).then((res)=>{
    //         return {message:'Success',statuscode:200,result:res.rows,total:res.total,sizepaginationPage:res.sizepaginationPage,currentpage:res.currentpage}
    //     })
    //     res.status(200).send(result);
    // })



    return router;

}