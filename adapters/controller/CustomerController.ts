import { Router, Request, Response } from "express";
import { CustomerService } from "../../core/services/CustomerService";
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";

export function createCustomerController(customerService:CustomerService,authorizationService:AuthorizationService) {
    const router = Router();

    router.post("/customers",authorizationService.authMiddleware.bind(authorizationService), (req: Request, res: Response) => {
        customerService.addProduct(req.body.name, req.body.quantity);
        res.status(201).send({ message: "Product added", name: req.body.name, quantity: req.body.quantity });
    });

    router.get("/customers",authorizationService.authMiddleware.bind(authorizationService), (_req: Request, res: Response) => {
        res.status(200).send(customerService.getAllProducts());
    });

    // router.get(`/products/:id`, (_req: Request, res: Response) => {
    //     console.log(_req.params.id)
    //     res.status(200).send(customerService.getOrderById(Number(_req.params.id)));
    // });

    return router;

}