import { ISuppliersResponsitory  } from "../../core/ports/ISuppliersResponsitory";
import { Pool } from 'pg';
require('dotenv').config();
//
export class InPostgresqlSuppliersRepository implements ISuppliersResponsitory{

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
            // const connect = await this
        })
    }
    read(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const connect = await this.client.connect();
            const res = await this.client.query('SELECT * FROM vendor');
            resolve(res.rows);
            connect.release();
           
        })
    }
    delete(id: number): void {

    }
    update(value: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // const connect = await this
        })
    }
}