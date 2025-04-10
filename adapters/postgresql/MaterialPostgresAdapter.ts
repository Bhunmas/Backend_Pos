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
            
        })
    }
    readAll(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query('select * from materials');
            if(res.rowCount <= 0) reject(res)
            resolve(res.rows);
            connect.release();
        })
    }
    readOne(valuebyid: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
        })
    }
    update(value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
        })
    }
}