
import { Pool } from 'pg';
import { ISupplierHistoryOrderResponsitory } from "../../core/ports/ISupplierHistoryOrderResponsitory";
require('dotenv').config();


export class InPostgresqlSupplierHistoryRepository implements ISupplierHistoryOrderResponsitory{
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
    create(value: any): Promise<any> {
        console.log(value)
        return new Promise(async(resolve,reject)=>{
            const st = JSON.stringify(value.items);
            const connect = await this.client.connect();
            const res = await this.client.query(`INSERT INTO purchase_orders (supplier_id, employee_id, items)

                VALUES (
    ${value.supplier_id},
    ${value.employee_id},
    '${st}'
);`);
            resolve(res.rows);
            connect.release();
        })
    }
    readAll(): Promise<any> {
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            const res = await this.client.query(`select * from purchase_orders`);
            resolve(res.rows);
            connect.release();
        })
    }
    update(value: any): Promise<any> {
        return new Promise(()=>{})
    }
}