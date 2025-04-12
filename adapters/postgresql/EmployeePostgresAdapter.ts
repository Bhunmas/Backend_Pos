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
        
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            try{
                console.log('value :',value)
                await Object.keys(value).map((res)=>
                        value[res] == undefined || value[res] == null ? reject({errorcode:10,message:`${res} is null`,status:404}): value
                )
                // emailVerify
                const emailVerify = await this.client.query(`select email from employees where email = '${value.email}'`); 
                if(emailVerify.rowCount > 0) reject({errorcode:23505,message:"email already exists",status:400})
                console.log("value: ",Object.keys(value))
                // insert row
                const res = await this.client.query(`insert into employees(employee_name,employee_lastname,email,phone,region,position,salary,active) values('${value.Employee_name}','${value.Employee_lastname}','${value.email}','${value.phone}','Thailand','${value.position}',${value.salary},true)`);
                console.log('res',res)
                if(res.rowCount<=0) reject(res); 
                resolve(res);   
            }catch(error){
                if(error.code == 23505) reject({errorcode:23505,message:"email already exists",status:400})
                reject(error);
            }finally{
                connect.release();
            }
           
        })
    }

    updateEmployee(value:Employee):Promise<any>{
        return new Promise(async(resolve,reject)=>{
            console.log('value ',value);
            const connect = await this.client.connect();
            try{
                // becareful when user region is null set Default;
                if(value.region == null)  value.region = 'Thailand';
                if(value.Employee_id == null) reject({errorcode:0,message:'id is null',status:404})
                await Object.keys(value).map((res)=>
                    value[res] == undefined || value[res] == null ? reject({errorcode:10,message:`${res} is null`,status:404}): value
                )
                // emailVerify 
                const emailVerify = await this.client.query(`select * from employees where email = '${value.email}'`);
                console.log('email ',emailVerify)
                if(emailVerify.rowCount > 1 ) reject({errorcode:23505,message:"email already exists",status:400})
                // verify row have exist.
                const search = await this.client.query(`select * from employees where employee_id = ${value.Employee_id}`);
                if(search.rowCount<=0) reject({'message':'Data not found','status':404});
                // update row
                const res = await this.client.query(`update employees 
                set employee_name ='${value.Employee_name}' , 
                employee_lastname ='${value.Employee_lastname}',
                email ='${value.email}',
                phone ='${value.phone}',
                region ='Thailand',
                position ='${value.position}',
                salary =${value.salary},
                active = '${value.active}'
                where employee_id = ${value.Employee_id}`);
                resolve(res.rows);
              
            }catch(error){
                if(error.code == 23505) reject({errorcode:23505,message:"email already exists",status:400})
                reject(error);
            }finally{
                connect.release(); 
            }
            

        })
    }

    login(value:any){
        return new Promise(async(resolve,reject)=>{
            const connect = await this.client.connect();
            try{
            
                if(value.email == null || value.password == null)  reject({errorcode:10,message:"email or password is null",status:400})
                const search = await this.client.query(`select * from employees where email = '${value.email}' and employee_password = '${value.password}'`);
               
                if(search.rows < 0) reject ({errorcode:10,message:"email or password is incorrect",status:400})
                await this.client.query(`insert into tokens(user_id,token,expires_at) values('${search.rows[0].employee_id}','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9','2025-04-12 10:00:00')`);
              
                resolve({id:search.rows[0].employee_id,user:search.rows[0].employee_name,token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',permission:search.rows[0].position});
            }catch(error){
                reject(error);
            }finally{
                connect.release(); 
            }

        })
    }
}