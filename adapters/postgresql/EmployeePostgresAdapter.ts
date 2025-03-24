import { Pool } from "pg";
import { IEmployeeRepository } from "../../core/ports/IEmployeeRepository";
import { Employee } from "../../core/entites/DbAws/Employee";
require('dotenv').config();
export class InPostgresqlEmployeeRepository implements IEmployeeRepository{
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
    create(value:Employee):Promise<any>{
        return new Promise((resolve,reject)=>{
            const connect = this.client.connect();
            console.log("value: ",value)
            // email cadidate key
            const res = this.client.query(`insert into employees(employee_name,employee_lastname,email,phone,region,position,salary,active) values('${value.Employee_name}','${value.Employee_lastname}','${value.email}','${value.phone}','Thailand','${value.position}',${value.salary},true)`);
            if(res.rowCount<=0) reject(res); 
            resolve(res);   
            connect.release();
        })
    }

    updateEmployee(value:Employee):Promise<any>{
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            const search = await this.client.query(`select * from employees where employee_id = ${value.Employee_id}`);
            if(search.rowCount<=0) reject({'message':'Data not found','status':404});
            const res = await this.client.query(`update employees set employee_name ='${value.Employee_name}' where employee_id = ${value.Employee_id}`);
            if(search.rowCount<=0) reject({'message':'Data not update','status':404});
            resolve(res.rows);
            connect.release(); 

        })
    }
}