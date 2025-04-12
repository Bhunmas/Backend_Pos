import { Pool } from 'pg';
import { ITransactionRepository } from "../../core/ports/ITransactionRepository";
import { Transaction } from '../../core/entites/DbAws/Transaction';

require('dotenv').config();


export class InPostgresqlTransactionRepository implements ITransactionRepository{
    private client = new Pool({
        user: process.env.USER_DATABASE,
        host: process.env.HOST_DATABASE,
        database: process.env.NAME_DATABASE,
        password: String(process.env.PASSWORD_DATABASE),
        // port:process.env.PORT_DATABASE,
        // ssl:false
        ssl:{
            rejectUnauthorized:false
        }
    })
    readAll(): Promise<any> {
        return new Promise(async (resolve,reject)=>{
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM transactions');
            resolve(res.rows);
            connect.release();
        })
    }
    create(value:Transaction): Promise<any> {
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            const insertTransactionCommand = `insert into transactions(product_id,employee_id,quantity,total_price,employee_name) values(${value.Product_id},${value.Employee_id},${value.Quantity},${value.Total_price},(select e.employee_name from employees e where e.employee_id = ${value.Employee_id}))`
            //insert into transactions(product_id,employee_id,product_name,quantity,total_price,employee_name) select ${value.Product_id},${value.Employee_id},p.product_name,${value.Quantity},${value.Total_price},e.employee_name from Transactions t join products p on ${value.Product_id} = p.product_id
//join employees e on ${value.Employee_id} = e.employee_id
            // insert into transactions(product_id,employee_id,employee_name,product_name) select t.product_id,t.employee_id,p.product_name from Transactions t join products p  on t.product_id = p.product_id
            const res = await this.client.query(insertTransactionCommand);

            resolve(res.rows);
            connect.release();
        })
    }

    readTable():Promise<any>{
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            const res = await this.client.query(`select * from transactions`);
            resolve(res.rows);
            connect.release();
         
        })
    }
}