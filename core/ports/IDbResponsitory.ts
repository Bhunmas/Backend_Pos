import { OrderDb } from "../entites/DbAws/OrderDb";

export interface IOrderDbResponsitory{
    readAll():Promise<OrderDb[]>;
    readTable():Promise<OrderDb[]>;
    readOne(id:number):Promise<OrderDb>;
    addOrder(value:OrderDb):Promise<any>;
    addOrders(value:OrderDb[]):void;
    connect():void;
    readOneCatagory(catagory:string):Promise<OrderDb>;
    activeOrder(valuebyid:number):Promise<any>;
    inactiveOrder(valuebyid:number):Promise<any>;

    updateOrder(value:OrderDb):Promise<any>;
    deleteOrder(id:number):Promise<any>;


}