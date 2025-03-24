import { OrderDb } from "../../entites/DbAws/OrderDb";
import { IOrderDbResponsitory } from "../../ports/IDbResponsitory";


export class OrderDbService{
    constructor(private orderRespository:IOrderDbResponsitory){

    }
    connect(){
        return this.orderRespository.connect();
    }
    addOrder(item:OrderDb){
        const result = new OrderDb(item.Order_id,item.Order_name,item.Order_price,item.Order_category,item.Order_active,item.Order_imageurl);
        return  this.orderRespository.addOrder(result);
       
    }
    updateOrder(item:OrderDb){
        const result = new OrderDb(item.Order_id,item.Order_name,item.Order_price,item.Order_category,item.Order_active,item.Order_imageurl);
        return  this.orderRespository.updateOrder(result);
    }

    readOne(id:number){
      
        console.log('any :',id)
        return  this.orderRespository.readOne(id);
    }

    readOrder(){
        return  this.orderRespository.readAll()
    }
    
    readCatagory(catagory:string){
        return this.orderRespository.readOneCatagory(catagory)
    }

    active(valuebyid:number){
        return this.orderRespository.activeOrder(valuebyid);
    }

    inactive(valuebyid:number){
        return this.orderRespository.inactiveOrder(valuebyid);
    }


}