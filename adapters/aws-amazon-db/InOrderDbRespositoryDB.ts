import { OrderDb } from "../../core/entites/DbAws/OrderDb";
import { IOrderDbResponsitory } from "../../core/ports/IDbResponsitory";
import { Mysql } from "../mysql/mysql2";


export class InOrderDbRespositoryDB implements IOrderDbResponsitory{
    
    private OrderDB:OrderDb[]=[];
    private Mysql:Mysql= new Mysql();
    connect(): void {
        
    }
    async readOne(id: number): Promise<OrderDb> {
        return await this.Mysql.readOne(id)
    }

    async readAll(): Promise<any> {
        return await this.Mysql.readAll()
        
    }
    async addOrder(value: OrderDb): Promise<any> {
        
    }
    addOrders(value: OrderDb[]): void {
        
    }
    readOneCatagory(catagory: string): Promise<OrderDb> {
        return  new Promise(async(resolve, reject) => {
           
           
           
        })
    }
}

