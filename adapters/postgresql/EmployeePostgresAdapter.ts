import { Pool } from "pg";
import { IEmployeeRepository } from "../../core/ports/IEmployeeRepository";
require('dotenv').config();
export class InPostgresqlEmployeeRepository implements IEmployeeRepository{
    private client = new Pool({
        user: process.env.USER_DATABASE,
        host: process.env.HOST_DATABASE,
        database: process.env.NAME_DATABASE,
        password: String(process.env.PASSWORD_DATABASE),
        port:process.env.PORT_DATABASE,
        ssl:false
    })
    readAll(): Promise<any> {
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM employees ORDER BY employee_id ASC');
            if(res.rowCount<= 0 ) reject(res);
            resolve(res.rows);
            connect.release();
        })
    }
    readOne(valuebyid: number): Promise<any> {
        return new Promise(async(resolve,reject)=>{
            if(valuebyid == null ) reject([]);
            const connect = await this.client.connect();
            const res = await this.client.query(`Select * from employees where employee_id = ${valuebyid}`);
            if(res.rowCount <= 0) reject(res);
            resolve(res.rows);
            connect.release();

        })
    }
}