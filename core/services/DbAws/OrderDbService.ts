import { OrderDb } from "../../entites/DbAws/OrderDb";
import { IOrderDbResponsitory } from "../../ports/IDbResponsitory";


export class OrderDbService{
    constructor(private orderRespository:IOrderDbResponsitory){

    }
    
    addOrder(item:OrderDb){
        
        const result = new OrderDb(item.product_id,item.product_name,item.product_price,item.product_category,item.product_active,item.product_imageurl);
        return  this.orderRespository.addOrder(result);
       
    }
    updateOrder(item:any){
        console.log('item : ',item);
        if(item.product_imageurl == undefined){
            return new Promise((resolve,reject)=>{
                reject({errorcode:10001,result:"image"})
            })
        }
       
        return  this.orderRespository.updateOrder(item);
    }

    readOne(id:number){
      
        console.log('any :',id)
        return  this.orderRespository.readOne(id);
    }

    readOrder(){
        return  this.orderRespository.readAll()
    }
    readOrderTable(){
        return  this.orderRespository.readTable()
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

    delete(id:number):Promise<any>{
        return this.orderRespository.deleteOrder(id);
    
    }
    readPagination(number:any){
        
        return this.orderRespository.readPagination(number);
    }


}