import { Pool } from 'pg';
import { IOrderDbResponsitory } from "../../core/ports/IDbResponsitory";
import { OrderDb } from '../../core/entites/DbAws/OrderDb';
import { error } from 'console';

export class InPostgresqlProductRepository implements IOrderDbResponsitory {
    private client: any = new Pool({
        user: process.env.USER_DATABASE,
        host: process.env.HOST_DATABASE,
        database: process.env.NAME_DATABASE,
        password: process.env.PASSWORD_DATABASE,
        ssl: {
            rejectUnauthorized: false
        }

    });
    private result: OrderDb = new OrderDb("dasd", "2");

    async connect() {

        const connect = await this.client.connect();
        const res = await this.client.query('SELECT * FROM products ORDER BY product_id ASC');
        console.log(res);
        connect.release();

    }
    readAll(): Promise<OrderDb[]> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM products ORDER BY product_id ASC');
            resolve(res.rows);
            connect.release();
        })


    }
    readOne(id: number): Promise<OrderDb> {
        return new Promise(async(resolve, reject) => {
            if(Number.isNaN(id)){
                reject("error");
                return;
            }
            const connect = await this.client.connect();
            const res = await this.client.query(`SELECT * FROM products WHERE product_id = ${id} ORDER BY  product_id ASC`);
            if(res.rows.length <= 0){
                reject(res);
                connect.release();
                return 
            }
            resolve(res.rows);
            connect.release();
           
        })
    }

    readOneCatagory(catagory: string): Promise<OrderDb> {
        return new Promise(async(resolve, reject) => {
           
            const connect = await this.client.connect();
            const res = await this.client.query(`SELECT * FROM products WHERE category = '${catagory}' ORDER BY  product_id ASC`);
            console.log("Res :",catagory)
            if(res.rows.length <= 0){
                reject(res);
                connect.release();
                return 
            }
            resolve(res.rows);
            connect.release();
           
        })
    }

    addOrder(value: OrderDb): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve([this.result]);
        })
    }
    addOrders(value: OrderDb[]): void {

    }

}