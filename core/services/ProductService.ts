import { Product } from "../entites/product";
import { IProductRepository } from "../ports/IProductResponsitory";

export class ProductService{
    constructor(private productResponsitory:IProductRepository){

    }

    addProduct(id:string,name:string):void{
        const product = new Product(id,name);
        console.log(product);
        this.productResponsitory.add(product);
    }
    
    getAllProducts(): Product[] {
        return this.productResponsitory.getAll();
    }
    getOrderById(id:number):Product{
        return this.productResponsitory.getOrderById(id);
    }
}