
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
          
            const res = await this.client.query(`select id,e.employee_id,employee_name,vendor_id,vendor_name,items,order_date from purchase_orders  inner join vendor v on v.vendor_id = purchase_orders.supplier_id  inner join employees  e on e.employee_id = purchase_orders.employee_id  `);
            const totalRes = await this.client.query(`select count(id) from purchase_orders`);
            console.log('totalRes',totalRes)
            res.rows.total = totalRes.rows[0].count;
            console.log('totalRes',totalRes)
            resolve(res.rows);
            connect.release();
        })
    }

    readPagination(number:number){
        return new Promise(async(resolve,reject)=>{

            console.log( number)
            const connect = await this.client.connect();
            const res = await this.client.query(`select id,e.employee_id,employee_name,vendor_id,vendor_name,items,order_date from purchase_orders  inner join vendor v on v.vendor_id = purchase_orders.supplier_id  inner join employees  e on e.employee_id = purchase_orders.employee_id  order by id desc limit 5 offset ${number*5}  `);
            const totalRes = await this.client.query(`select count(id) from purchase_orders`);
           
            console.log('res',res.rows)
            
            resolve({rows:res.rows,total:totalRes.rows[0].count,sizepaginationPage:5,currentpage:number+1});
            connect.release();
        })

    }
    update(value: any): Promise<any> {
        return new Promise(()=>{})
    }
}