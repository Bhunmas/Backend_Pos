import { Customer } from "../entites/customer";
import { ICustomerRepository } from "../ports/ICustomerResponsitory";

export class CustomerService{
    constructor(private customerResponsitory:ICustomerRepository){

    }

    addProduct(name:string,quantity:number):void{
        const product = new Customer(name,quantity);
        console.log(product);
        this.customerResponsitory.add(product);
    }
    
    getAllProducts(): Customer[] {
        
        return this.customerResponsitory.getAll();
    }
    // getOrderById(id:number):Product{
    //     return this.productResponsitory.getOrderById(id);
    // }
}