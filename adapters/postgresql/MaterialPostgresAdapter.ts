import { Pool } from "pg";
import { IMaterialRepository } from "../../core/ports/IMaterialRepository";
export class InPostgresqlMaterialRepository implements IMaterialRepository{
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
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`insert into materials(mat_name,descriptions,category,price,amount,img_url,active) values('${value.mat_name}','${value.descriptions}','${value.category}',${value.price},'${value.amount}','${value.image}',${value.active})`);
            if(res.rowCount <= 0) reject(res)  
            resolve(res.rows);
            connect.release();
        })
            
    }
    readAll(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query('select * from materials order by mat_id  asc');
            if(res.rowCount <= 0) reject(res)
            resolve(res.rows);
            connect.release();
        })
    }
    readOne(valuebyid: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query(`select * from materials where mat_id = ${valuebyid} order by mat_id  asc`);
            if(res.rowCount <= 0) reject(res)
            resolve(res.rows);
            connect.release();
        })
    }
    update(value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await  this.client.connect();
            console.log('value :',value);
            const res = await this.client.query(`update  materials set  mat_name = '${value.mat_name}', descriptions = '${value.descriptions}',category = '${value.category}',amount = '${value.amount}', price = ${value.price},img_url = '${value.image}' , active = ${value.active} where mat_id = ${value.mat_id} `);
            if(res.roxwCount <= 0) reject(res)  
            resolve(res.rows);
            connect.release();
        })
    }
    readCategory(value: any){
        return new Promise(async (resolve, reject) => {
            const connect = await  this.client.connect();
            console.log('value :',value);
            const res = await this.client.query(`select * from materials where category = '${value}'`);
            if(res.rowCount <= 0) reject(res)  
            resolve(res.rows);
            connect.release();
        })
    }

    delete(value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try{
                const connect = await  this.client.connect();
                console.log('value :',value);
                const res = await this.client.query(`delete     from materials where mat_id = ${value}`);
                // if(res.rowCount <= 0) reject(res)  
                console.log('res',res);
                resolve(res.rows);
                connect.release();
            }catch(error){
                reject(error);
            }
           
         
           
        })

    }
}