import { OrderDb } from "../entites/DbAws/OrderDb";

export interface IOrderDbResponsitory{
    readAll():Promise<OrderDb[]>;
    readOne(id:number):Promise<OrderDb>;
    addOrder(value:OrderDb):Promise<any>;
    addOrders(value:OrderDb[]):void;

}