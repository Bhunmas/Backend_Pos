import { OrderDb } from "../../entites/DbAws/OrderDb";
import { IOrderDbResponsitory } from "../../ports/IDbResponsitory";


export class OrderDbService{
    constructor(private orderRespository:IOrderDbResponsitory){

    }
    connect(){
        return this.orderRespository.connect();
    }
    addOrder(item:OrderDb){
        const result = new OrderDb(item.Order_id,item.Order_name);
        return  this.orderRespository.addOrder(result);
       
    }

    readOne(id:number){
    
        return  this.orderRespository.readOne(id);
    }

    readOrder(){
        return  this.orderRespository.readAll()
    }
}