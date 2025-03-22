import { Pool } from 'pg';
import { IOrderDbResponsitory } from "../../core/ports/IDbResponsitory";
import { OrderDb } from '../../core/entites/DbAws/OrderDb';
import { error } from 'console';
require('dotenv').config();
export class InPostgresqlProductRepository implements IOrderDbResponsitory {
    private client: any = new Pool({
        user: process.env.USER_DATABASE,
        host: process.env.HOST_DATABASE,
        database: process.env.NAME_DATABASE,
        password: String(process.env.PASSWORD_DATABASE),
        port:process.env.PORT_DATABASE,
        ssl:false
        // ssl: {
        //     rejectUnauthorized: false  // Adjust as needed for SSL setup
        //   }

    });
    private result: OrderDb = new OrderDb("", "", 0, "", false);

    async connect() {

        const connect = await this.client.connect();
        const res = await this.client.query('SELECT * FROM products ORDER BY product_id ASC');
        console.log(res);
        connect.release();

    }
    readAll(): Promise<OrderDb[]> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM products where active = true ORDER BY product_id ASC');
            resolve(res.rows);
            connect.release();
        })


    }
    readOne(id: number): Promise<OrderDb> {
        return new Promise(async (resolve, reject) => {
            if (Number.isNaN(id)) {
                reject("error");
                return;
            }
            const connect = await this.client.connect();
            const res = await this.client.query(`SELECT * FROM products WHERE product_id = ${id}  `);
            if (res.rows.length <= 0) {
                reject(res);
                connect.release();
                return
            }
            resolve(res.rows);
            connect.release();

        })
    }

    readOneCatagory(catagory: string): Promise<OrderDb> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`SELECT * FROM products WHERE category = '${catagory}' ORDER BY  product_id ASC`);
            console.log("Res :", catagory)
            if (res.rows.length <= 0) {
                reject(res);
                connect.release();
                return
            }
            resolve(res.rows);
            connect.release();

        })
    }

    addOrder(value: OrderDb): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`INSERT INTO products(product_name,price,category,active) values('${value.Order_name}',${value.Order_price},'${value.Order_category}',True)`);
            resolve([]);
            connect.release();
        })
    }
    updateOrder(value: OrderDb): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try{
                const connect = await this.client.connect();
                const seachResult =  this.client.query(`Select * from Products where product_id = ${value.Order_id}`);
                if(seachResult.rows <= 0) throw Error('Data not found');
                const res = await this.client.query(`Update Products set product_name = '${value.Order_name}',price =${value.Order_price} ,category ='${value.Order_category}' where product_id = ${value.Order_id}`);
                if(res.rowCount <= 0 ) reject(res);
                resolve(res);
                connect.release();
            }catch(error){
                reject(error);
            }
           
        })
        
    }

    activeOrder(valuebyid: number): Promise<any>{
        return new Promise(async(resolve,reject)=>{
            if(valuebyid == null ) reject([]);
            const connect = await this.client.connect();
            const res = this.client.query(`Update Products set active = true where product_id = ${valuebyid}`);
            if(res.rowCount <= 0) reject(res);
            resolve(res)
            connect.release();
        });
    }
    inactiveOrder(valuebyid: number): Promise<any>{
        return new Promise(async(resolve,reject)=>{
            if(valuebyid == null ) reject([]);
            const connect = await this.client.connect();
            const res = await this.client.query(`Update Products set active = false where product_id = ${valuebyid}`);
            if(res.rowCount <= 0) reject(res);
            resolve([]);
            connect.release();
        })
    }
    deleteOrder(id: number): void {

    }
    addOrders(value: OrderDb[]): void {

    }

}